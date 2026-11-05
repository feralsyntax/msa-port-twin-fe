import { useForm } from 'react-hook-form';
import AddBerthTopBar from '../../../components/Berths/AddBerth/AddBerthTopBar/AddBerthTopBar';
import BerthIdentityForm, {
  type BerthFormValues,
} from '../../../components/Berths/AddBerth/BerthIdentityForm/BerthIdentityForm';
import './AddBerth.scss';
import BerthConstraintsForm from '../../../components/Berths/AddBerth/BerthConstraintsForm/BerthConstraintsForm';

const AddBerthPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BerthFormValues>({
    defaultValues: {
      name: '',
      terminal: '',
      status: 'available',
      max_vessel_length: '',
      max_vessel_draft: '',
      latitude: '',
      longitude: '',
    },
  })

  const onSubmit = (data: BerthFormValues) => {
    // Wired in a later section when actions + API hook are ready
    console.log('Add berth draft:', data)
  }

  return (
    <div className="add-berth-page">
      <AddBerthTopBar />

      <div className="add-berth-page__content">
        <div className="add-berth-page__container">
          <form
            className="add-berth-page__form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
             
            <BerthIdentityForm register={register} errors={errors} />
            <BerthConstraintsForm register={register} errors={errors} />
            {/* Section 4 next */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBerthPage