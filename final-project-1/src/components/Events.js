import React from 'react';
import {useState} from 'react';

const Events = () => {
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    return (
        <div>
            <h1 className="event-header">Upcoming Events</h1>
            <p className="event-header">Charlottesgotalot.com is not the primary provider of tickets for any events listed.</p>

            <div className="container">
            <input type="text" name="search" placeholder='Search'/>
            <div className="container"></div>
            <label>Start Date</label>
            <input type="text" name="startDate"/>
            <div className="container"></div>
            <label>End Date</label>
            <input type="text" name="endDate"/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            
        
            <label id='category-label'>Category</label>
            <br></br>
            <br></br>
            <div className="category-filter">
            {['Concerts','Sports','Art & Theater', 'Festival', 'Adult Only'].map((item)=>(
                <label key={item}>
                    <input
                    type= "radio"
                    name= "category"
                    value= {item}
                    checked={category === item}
                    onChange={(e) => setCategory(e.target.value)} 
                    />
                    {item}
                </label>
            ))}
            </div>
            <br></br>
            <label id='price-label'>Prices</label>
            <br></br>
            <br></br>
            <div className="price-filter">
            {['Free','Paid'].map((item)=>(
                <label key={item}>
                    <input
                    type= "radio"
                    name= "price"
                    value= {item}
                    checked={category === item}
                    onChange={(e) => setPrice(e.target.value)} 
                    />
                    {item}
                </label>
            ))}
            </div>


        </div>
    )
};

export default Events;