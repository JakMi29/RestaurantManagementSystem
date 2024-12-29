import { useFetcher } from 'react-router-dom';
import classes from './Form.module.css';
import uiClasses from '../ux/Ui.module.css';
import { useEffect, useRef, useState } from 'react';
import { manageMeal, MealData } from '../../api/form/Meal';
import { MealInterface } from '../../interfaces/Meal';
import { Mode } from '../../constants/Mode';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';
import { getRestaurantName } from '../../services/LocalStorage';

interface MealFormDialogProps {
  meal?: MealInterface;
  mode: Mode;
  onClose: () => void;
}

function MealFormDialog({ meal, mode, onClose }: MealFormDialogProps) {
  const fetcher = useFetcher();
  const [error, setError] = useState(false);
  const [preview, setPreview] = useState<string>(meal ? meal.image : '');
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const method = mode === Mode.CREATE ? 'post' : 'patch';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    setError(false);
    if (event.target.name === 'image' && event.target instanceof HTMLInputElement && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = event.dataTransfer.files;
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const cancel = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setError(false);
    setPreview(meal ? meal.image : '');
    onClose();
  };

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.code === 200) {
        onClose();
        setPreview('');
        setError(false);
      } else {
        setError(true);
      }
    }
  }, [fetcher.data, onClose]);

  return (
    <fetcher.Form ref={formRef} className={classes.form} method={method} encType="multipart/form-data">
      {error && <span style={{ color: 'red' }}>{fetcher.data?.message}</span>}
      <input
        type="hidden"
        name="oldName"
        defaultValue={meal ? meal.name : ''}
      />
      <TextField
        label="Name"
        name="name"
        required
        defaultValue={meal ? meal.name : ''}
        onChange={handleChange}
      />
      <FormControl fullWidth size="small">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          id="category"
          label="Categor"
          name="category"
          required
          defaultValue={meal ? meal.category : ''}
          onChange={handleChange}
        >
          <MenuItem value="APPETIZER">Appetizer</MenuItem>
          <MenuItem value="MAIN_DISH">Main Dish</MenuItem>
          <MenuItem value="SOUP">Soup</MenuItem>
          <MenuItem value="DRINK">Drink</MenuItem>
          <MenuItem value="DESSERT">Dessert</MenuItem>
          <MenuItem value="ALCOHOLIC_DRINK">Alcoholic Drink</MenuItem>
        </Select>
      </FormControl>
      <label htmlFor="image" style={{color:"rgba(0, 0, 0, 0.6)"}}>Image</label>
      <Box
        className={classes.imagePlaceholder}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        sx={{
          border: '2px dashed #ccc',
          borderRadius: '4px',
          height: '200px',
          backgroundImage: preview ? `url(${preview})` : meal ? `url(${meal.image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {!preview && <Typography variant="body1" sx={{ color: '#888' }}>Click to select photo or drag photo</Typography>}
      </Box>
      <input
        id="image"
        type="file"
        name="image"
        ref={fileInputRef}
        required={method === 'post'}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        required
        defaultValue={meal ? meal.price : ''}
        onChange={handleChange}
        fullWidth
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end" sx={{color:"rgb(0, 0, 0, 0.6)"}}>$</InputAdornment>,
          },
        }}
      />
      <TextField
        id="description"
        name="description"
        label="Description"
        required
        multiline
        rows={4}
        defaultValue={meal ? meal.description : ''}
        onChange={handleChange}
      />
      <div className={classes.actions}>
        <button className={uiClasses.redButton} type="button" onClick={cancel}>
          Cancel
        </button>
        <button className={uiClasses.blueButton} type="submit">
          {mode === Mode.CREATE ? 'Create' : 'Save'}
        </button>
      </div>
    </fetcher.Form>
  );
}

export async function action({ request }: { request: Request }): Promise<Response> {
  const method = request.method.toLowerCase() as 'post' | 'patch';
  const data = await request.formData();

  const mealData: MealData = {
    name: data.get('name') as string,
    category: data.get('category') as string,
    price: parseFloat(data.get('price') as string),
    description: data.get('description') as string,
    restaurantName: getRestaurantName() ?? "",
    oldName: data.get('oldName') ? (data.get('oldName') as string) : undefined,
  };

  const imageFile = data.get('image') as File;

  try {
    await manageMeal(method, mealData, imageFile);
  } catch (error) {
    if (error instanceof Response) {
      return error;
    }
    throw new Response(JSON.stringify({ message: 'Could not save meal.' }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: 'Meal saved successfully!' }), { status: 200 });
}

export default MealFormDialog;
