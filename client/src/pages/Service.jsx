import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../store/Auth';

const Service = () => {
  const {API} = useAuth()
  const [serviceData, setServiceData] = useState([]);

  const getServiceData = async () => {
    try {
      const response = await fetch(`${API}/api/data/service`, {
        method: "GET"
      })
      const data = await response.json();
      if (response.ok) {
        // console.log(response)
        console.log(data);
        setServiceData(data.msg);
      } else {
        console.log("data not found")
      }
    } catch (error) {
      console.log(`service error ${error}`)
    }
  }

  useEffect(() => {
    getServiceData()
  }, [])


  return (
    <section className='section-services'>
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-three-cols">

        {
          serviceData.map((curElement, index) => {
            const { price, description, provider, service } = curElement;

            return (
              <div className="card" key={`servicecard ${index}`}>
                <div className="card-img">
                  <img src="/images/design.png" alt="our services info  card" />
                </div>

                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>{provider}</p>
                    <p>{price}</p>
                  </div>
                  <h2>{service}</h2>
                  <p>{description}</p>
                </div>
              </div>)
          })
        }

      </div>
    </section>
  )
}

export default Service