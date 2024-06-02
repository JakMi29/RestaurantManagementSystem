import { Link } from 'react-router-dom';
import classes from '../../pages/meals/MealPage.module.css';

function Meal({ name, price, description, image, mealOfDay }) {

    return (
        <div className={classes.meal}>
            <div className={classes.mealImage}>
                <img src={"http://localhost:8080/api/admin/image?image=" + image} />
            </div>
            <div className={classes.mealContent}>
                <h3>{name}</h3>
                <p>{description}</p>
                <p>Price: {price} usd</p>
            </div>
            <div className={classes.actions}>
                <Link className={classes.editButton} to={"edit?name=" + name}>Edit</Link>
                <button className={classes.deleteButton}>Delete</button>
            </div>
        </div>
    )
}
export default Meal;