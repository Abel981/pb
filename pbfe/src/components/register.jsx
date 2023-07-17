import { useForm, Controller,FormProvider } from "react-hook-form"
import Input from '@mui/joy/Input';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Checkbox from '@mui/joy/Checkbox';
import Button from '@mui/joy/Button';
import {LoadingButton} from '@mui/lab'
// import FormControl from '@mui/material/FormControl';
import { FormControl, FormControlLabel } from '@mui/material';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";




const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isSubmitting },
      } = useForm({
        defaultValues: {
            firstName: "",
            middleName:"",
            lastName:"",
            gender:"",
            phone:"",
            agentType:"",
            terms:false
          
            
          },
        }
      )
  
      
      const options = [
        { value: 'addisababa', label: 'aa' },
        { value: 'bahirdar', label: 'bahirdar' },
        { value: 'mekelle', label: 'mekelle' }
      ]
      const onSubmit = (data) => {
        return new Promise((resolve, reject) => {

          const formData = new FormData();
          for (let i = 0; i < data.id.length; i++) {
            formData.append('files', data.id[i]);
          }
          // data = { ...data, id: data.id[0].name };
          data.region = data.city.value;
          delete data.city
          delete data.id;
          delete data.terms
    formData.append("nonFileData", JSON.stringify(data));
          // alert('did i run')
          // console.log(formData)
          axios.post('http://localhost:3000/register',formData)
          .then((res) =>{
  
            toast.success('your data has been saved')
            console.log(res)
            resolve();
          }
          )
          .catch(() => {
  
            toast.error('something went wrong')
            console.log('error')
            reject()
          } 
          );

        })
          
      }
      
      
      
      const notify = () => toast('Here is your toast.');
      return (
        <>
      
      <Toaster />
   

        <div className='mx-auto w-full md:w-2/3 md:max-w-2xl md:shadow-xl md:rounded-lg p-5'>

        <h1 className='font-bold text-center text-lg'>Agent Registration Form</h1>
        <h2 className='font-semibold mb-3'>Please fill in the form below</h2>
        <div className='mb-3'><span className='text-red-700'>*</span>Required</div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className='flex flex-col gap-2 mb-3 md:flex-row md:items-center '>
            <label htmlFor="firstname" className='w-28'>First Name:</label>
            <div className='flex flex-row flex-grow items-center gap-3'>

              <Input {...register("firstName", {required:true})}  error={!!errors.firstName} placeholder={'firstname'} className={`ml-6 ${errors.firstName? 'border-red-500' : ''}`} id={'firstname'}/>
              {errors.firstName ? <span className='text-pink-600 inline'>Required</span>:''}

          </div>


          </div>
          <div className='flex flex-col gap-2 mb-3 md:flex-row md:items-center'>
            <label htmlFor="middlename" className='w-28'>Middle Name:</label>
            <div className='flex flex-row flex-grow items-center gap-3'>
            <Controller
            name="middleName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} disabled={isSubmitting} error={!!errors.middleName} placeholder={'middlename'} className={`ml-6 ${errors.middleName? 'border-red-500' : ''}`} id={'middlename'}/>}
          />
                      {errors.middleName ? <span className='text-pink-600 inline'>Required</span>:''}
          </div>

          </div>
          <div className='flex flex-col gap-2 mb-3 md:flex-row md:items-center'>

            <label htmlFor="lastName" className='w-28'>Last Name:</label>
            <div className='flex flex-row flex-grow items-center gap-3'>

            <Controller
            name="lastName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input disabled={isSubmitting} {...field} error={!!errors.lastName} placeholder={'lastname'} className={`ml-6 ${errors.lastName? 'border-red-500' : ''}`} id={'lastName'}/>}
            />
          {errors.lastName ? <span className='text-pink-600 inline'>Required</span>:''}
            </div>

          </div>
          <div className='mb-3'>
            <span>Gender:</span>
           <RadioGroup {...register("gender", {required:true})}>
            
            <Radio value="male" label="Male" variant="outlined" className=' w-fit' />
            <Radio value="female" label="Female" variant="outlined" className=' w-fit' />
          
          </RadioGroup>
          
          </div>
          <div className='mb-3'>
            <label htmlFor="phone">Phone Number</label>
            <Controller
            name="phone"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} disabled={isSubmitting} placeholder={'phone'} className="w-1/2" id={'phone'}/>}
            />


          </div>
          <div className='mb-3'>
            <span>Region</span>
            <Controller
                name="city"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select

                  disabled={isSubmitting}
                  {...field}
                  options = {options}

          />
        )}
        />
        </div>
        

        <div className='mb-3'>
            <span>Agent Type:</span>
            <Controller
            name="agentType"
            rules={{ required: true }}
            control={control}
            render={({ field }) => <RadioGroup {...field} disabled={isSubmitting} >
            <Radio value="simple" label="Simple" variant="outlined" className=' w-fit'/>
            <Radio value="detailed" label="Detailed" variant="outlined" className=' w-fit'/>
          </RadioGroup>}
          />
          </div>
          <div>

            <span>Upload your ID:</span>
            <label className="block">
    <span className="sr-only">Choose ID</span>
    <input type="file" disabled={isSubmitting} {...register('id', {required:true})} className="mb-3 block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
  </label>
           <Checkbox  {...register("terms" , {required:true})}  className='mb-3' label="By selecting this, you agree to our privacy policy." value={Number(watch('terms'))}/>
            
            </div>
            <div><LoadingButton type="submit" variant="outlined" disabled={!watch('terms')} loading={isSubmitting} 
            >Submit</LoadingButton></div>
            
        </form>
    
            </div>
           
        </>

  )
}

export default Register