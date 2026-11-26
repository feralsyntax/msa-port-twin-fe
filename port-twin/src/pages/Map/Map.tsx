import { useMemo } from 'react';
import type { LatLngBoundsExpression, LatLngTuple } from 'leaflet';
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from 'react-leaflet';
import { Link, useSearchParams } from 'react-router-dom';

import { BerthOperationalStatusEnum } from '../../api/models';
import type { Berth } from '../../api/models';
import ServerErrors from '../../components/errors/ServerErrors';
import { useGetAllBerths } from '../../hooks/berths/useGetAllBerths';
import { parseApiError } from '../../utils/apiError';
import { routes } from '../../utils/routes';
import './Map.scss';
import 'leaflet/dist/leaflet.css';

const KILINDINI_CENTER: LatLngTuple = [-4.056, 39.638];
const DEFAULT_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const DEFAULT_TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const getTileConfiguration = () => {
  const tileUrl = import.meta.env.VITE_MAP_TILE_URL?.trim();
  const tileAttribution = import.meta.env.VITE_MAP_TILE_ATTRIBUTION?.trim();

  if (Boolean(tileUrl) !== Boolean(tileAttribution)) {
    throw new Error('Configure both VITE_MAP_TILE_URL and VITE_MAP_TILE_ATTRIBUTION.');
  }

  return {
    url: tileUrl || DEFAULT_TILE_URL,
    attribution: tileAttribution || DEFAULT_TILE_ATTRIBUTION,
  };
};

const tileConfiguration = getTileConfiguration();

const mapLayers = [
  { key: 'basemap', label: 'Basemap' },
  { key: 'berths', label: 'Berths' },
] as const;

type MapLayerKey = (typeof mapLayers)[number]['key'];

const defaultLayers = new Set<MapLayerKey>(['basemap', 'berths']);

const statusColors: Record<Berth['status'], string> = {
  [BerthOperationalStatusEnum.active]: '#00d2c8',
  [BerthOperationalStatusEnum.inactive]: '#5f7688',
  [BerthOperationalStatusEnum.maintenance]: '#f5a623',
};

const isMapLayerKey = (value: string): value is MapLayerKey =>
  mapLayers.some((layer) => layer.key === value);

const isLocatedBerth = (berth: Berth): berth is Berth & { latitude: number; longitude: number } =>
  typeof berth.latitude === 'number' &&
  Number.isFinite(berth.latitude) &&
  berth.latitude >= -90 &&
  berth.latitude <= 90 &&
  typeof berth.longitude === 'number' &&
  Number.isFinite(berth.longitude) &&
  berth.longitude >= -180 &&
  berth.longitude <= 180;

const formatStatus = (status: Berth['status']) =>
  status.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

const parseEnabledLayers = (searchParams: URLSearchParams): Set<MapLayerKey> => {
  if (!searchParams.has('layers')) return new Set(defaultLayers);

  return new Set((searchParams.get('layers') ?? '').split(',').filter(isMapLayerKey));
};

const MapControls = ({ berthBounds }: { berthBounds: LatLngBoundsExpression | null }) => {
  const map = useMap();
  const centerHarbour = () => map.flyTo(KILINDINI_CENTER, map.getZoom());
  const fitBerths = () => {
    if (berthBounds) {
      map.fitBounds(berthBounds, { padding: [56, 56], maxZoom: 16, animate: false });
      if (!map.getBounds().contains(berthBounds)) {
        map.zoomOut(1, { animate: false });
      }
    } else {
      centerHarbour();
    }
  };

  return (
    <div
      className="map-controls"
      aria-label="Map controls"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="map-control map-control--compass"
        title="Center Kilindini Harbour; the map is north-up"
        aria-label="Center Kilindini Harbour; map is north-up"
        onClick={centerHarbour}
      >
        <span aria-hidden="true">N</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 7.5 13l4.5-2 4.5 2L12 2Z" />
          <path d="m7.5 13 4.5 9 4.5-9" />
        </svg>
      </button>
      <button
        type="button"
        className="map-control"
        title="Zoom in"
        aria-label="Zoom in"
        onClick={() => map.zoomIn()}
      >
        +
      </button>
      <button
        type="button"
        className="map-control"
        title="Zoom out"
        aria-label="Zoom out"
        onClick={() => map.zoomOut()}
      >
        −
      </button>
      <button
        type="button"
        className="map-control"
        title="Fit map to berth markers"
        aria-label="Fit map to berth markers"
        onClick={fitBerths}
      >
        ⛶
      </button>
    </div>
  );
};

export default function MapPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const berthsQuery = useGetAllBerths();
  const berths = useMemo(() => berthsQuery.data ?? [], [berthsQuery.data]);
  const enabledLayers = useMemo(() => parseEnabledLayers(searchParams), [searchParams]);
  const locatedBerths = useMemo(() => berths.filter(isLocatedBerth), [berths]);
  const unlocatedBerths = useMemo(() => berths.filter((berth) => !isLocatedBerth(berth)), [berths]);
  const error = berthsQuery.isError ? parseApiError(berthsQuery.error) : null;

  const berthBounds = useMemo<LatLngBoundsExpression | null>(() => {
    if (locatedBerths.length === 0) return null;

    const latitudes = locatedBerths.map((berth) => berth.latitude);
    const longitudes = locatedBerths.map((berth) => berth.longitude);

    return [
      [Math.min(...latitudes), Math.min(...longitudes)],
      [Math.max(...latitudes), Math.max(...longitudes)],
    ];
  }, [locatedBerths]);

  const toggleLayer = (key: MapLayerKey) => {
    const nextLayers = new Set(enabledLayers);
    if (nextLayers.has(key)) nextLayers.delete(key);
    else nextLayers.add(key);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set(
      'layers',
      mapLayers
        .filter((layer) => nextLayers.has(layer.key))
        .map((layer) => layer.key)
        .join(','),
    );
    setSearchParams(nextSearchParams, { replace: true });
  };

  return (
    <main className="map-page">
      <MapContainer
        className="map-page__canvas"
        center={KILINDINI_CENTER}
        zoom={14}
        minZoom={4}
        maxZoom={19}
        scrollWheelZoom
        zoomControl={false}
        attributionControl
      >
        <MapControls berthBounds={berthBounds} />
        {enabledLayers.has('basemap') && (
          <TileLayer url={tileConfiguration.url} attribution={tileConfiguration.attribution} />
        )}
        {enabledLayers.has('berths') &&
          locatedBerths.map((berth) => (
            <CircleMarker
              key={berth.id}
              center={[berth.latitude, berth.longitude]}
              radius={8}
              pathOptions={{
                color: '#06121b',
                fillColor: statusColors[berth.status],
                fillOpacity: 0.95,
                weight: 2,
              }}
            >
              <Popup>
                <div className="map-popup">
                  <strong className="map-popup__name">{berth.name}</strong>
                  <span className="map-popup__status">
                    {formatStatus(berth.status)}
                    {berth.is_occupied ? ' · Occupied' : ''}
                  </span>
                  {berth.assigned_vessel && (
                    <span>Assigned vessel: {berth.assigned_vessel.name}</span>
                  )}
                  <Link to={routes.berthDetails(berth.id)}>View berth details</Link>
                </div>
              </Popup>
            </CircleMarker>
          ))}
      </MapContainer>

      <aside className="map-layers" aria-label="Map layers">
        <div className="map-layers__header">
          <h1 className="map-layers__title">Kilindini Harbour</h1>
          <span className="map-layers__count">{enabledLayers.size} ACTIVE</span>
        </div>

        <ul className="map-layers__list">
          {mapLayers.map((layer) => (
            <li key={layer.key}>
              <label className="map-layers__row">
                <span>{layer.label}</span>
                <input
                  type="checkbox"
                  className="map-layers__checkbox"
                  checked={enabledLayers.has(layer.key)}
                  onChange={() => toggleLayer(layer.key)}
                />
              </label>
            </li>
          ))}
        </ul>

        {berthsQuery.isPending || berthsQuery.isError ? (
          <div className="map-layers__message">
            <ServerErrors
              isPending={berthsQuery.isPending}
              isError={berthsQuery.isError}
              isFetching={berthsQuery.isFetching}
              parsedError={error}
              refetch={berthsQuery.refetch}
              requestedData="berths"
              noData={false}
            />
          </div>
        ) : berths.length === 0 ? (
          <p className="map-layers__message">No berths have been added yet.</p>
        ) : (
          <section className="map-unlocated" aria-labelledby="map-unlocated-title">
            <h2 id="map-unlocated-title" className="map-unlocated__title">
              Berths without coordinates
            </h2>
            {unlocatedBerths.length > 0 ? (
              <ul className="map-unlocated__list">
                {unlocatedBerths.map((berth) => (
                  <li key={berth.id}>
                    <Link to={routes.berthDetails(berth.id)}>{berth.name}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="map-unlocated__empty">All berths have coordinates.</p>
            )}
          </section>
        )}
      </aside>

      {enabledLayers.has('berths') && (
        <aside className="map-legend" aria-label="Berth status legend">
          <h2 className="map-legend__title">Berth status</h2>
          <ul>
            <li>
              <span className="map-legend__marker map-legend__marker--active" />
              Active
            </li>
            <li>
              <span className="map-legend__marker map-legend__marker--maintenance" />
              Maintenance
            </li>
            <li>
              <span className="map-legend__marker map-legend__marker--inactive" />
              Inactive
            </li>
          </ul>
        </aside>
      )}
    </main>
  );
}
