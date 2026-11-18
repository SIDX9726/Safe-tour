import "./SmartTicketing.css";

function SmartTicketing() {

const places = [
  {
    name: "Kamakhya Temple",
    location: "Guwahati, Assam",
    type: "Temple",
    price: 500,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/48/Kamakhya_Temple_-_DEV_8829.jpg?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original"
  },

  {
    name: "Nartiang Durga Temple",
    location: "Jaintia Hills, Meghalaya",
    type: "Temple",
    price: 20,
    image:
      "https://www.pilgrimpackages.com/upload/package/image-6NYXWE0P7L380KY4.jpg"
  },

  {
    name: "Umiam Lake",
    location: "Shillong, Meghalaya",
    type: "Lake",
    price: 50,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYx6q95fcpWSEX7TsMec-0clZMQ5ZsGtxtA5tA4cnlfH4aXqU372ak9D2E&s=10"
  },

  {
    name: "Elephant Falls",
    location: "Shillong, Meghalaya",
    type: "Waterfall",
    price: 30,
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/1d/8a/ce/memories-for-life.jpg?w=1200&h=1200&s=1"
  },

  {
    name: "Shillong Peak",
    location: "Shillong, Meghalaya",
    type: "Viewpoint",
    price: 40,
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/shillong-peak-shilong2-meghalaya-attr-hero?qlt=82&ts=1742178228979"
  },

  {
    name: "Don Bosco Museum",
    location: "Shillong, Meghalaya",
    type: "Museum",
    price: 100,
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/don-bosco-museum-shillong-meghalaya-1-attr-hero?qlt=82&ts=1742168871030"
  }
];

  const handleBooking = (place) => {
    alert(`Booking started for ${place.name}`);
  };


  return (

    <div className="ticket-page">

      {/* PAGE HEADER */}

      <div className="ticket-header">

        <div>

          <h1>Smart Ticketing</h1>

          <p>
            Explore Shillong's beautiful tourist destinations
            and book your tickets easily.
          </p>

        </div>

        <div className="ticket-info">
          🎟️ Easy & Secure Booking
        </div>

      </div>


      {/* SEARCH */}

      <div className="ticket-search">

        <input
          type="text"
          placeholder="Search tourist places..."
        />

        <button>
          Search
        </button>

      </div>


      {/* PLACES */}

      <div className="places-grid">

        {places.map((place, index) => (

          <div
            className="place-card"
            key={index}
          >

            {/* IMAGE */}

            <div className="place-image">

              <img
                src={place.image}
                alt={place.name}
              />

              

            </div>


            {/* CONTENT */}

            <div className="place-content">

              <h2>
                {place.name}
              </h2>

              <p className="place-location">
                📍 {place.location}
              </p>


              <div className="place-bottom">

                <div className="price">

                  <span>Entry Fee</span>

                  <strong>
                    ₹{place.price}
                  </strong>

                  <small>
                    / person
                  </small>

                </div>


                <button
                  className="book-btn"
                  onClick={() => handleBooking(place)}
                >
                  Book Now
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default SmartTicketing;