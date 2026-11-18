import "./EmergencyResponse.css";

function EmergencyResponse() {

  const contacts = [
    {
      title: "Nearby Police Station",
      place: "Shillong Sadar Police Station",
      number: "0364-2224818",
      image:
        "https://media.assettype.com/psuwatch%2Fimport%2Fwp-content%2Fuploads%2F2022%2F02%2F2147267006_5fc8ac9eb0239.jpg?w=480&auto=format%2Ccompress&fit=max",
      type: "Police"
    },

    {
      title: "Nearby Hospital",
      place: "Civil Hospital, Shillong",
      number: "108",
      image:
        "https://shillongmedicalcollege.co.in/assets/img/hospital/civil3_0.png",
      type: "Hospital"
    },

    {
      title: "Tourist Helpline",
      place: "Tourist Information Centre, MTDC",
      number: "+91 364 222 6220",
      image:
        "https://content3.jdmagicbox.com/v2/comp/mumbai/x4/022pxx22.xx22.170113021009.m1x4/catalogue/maharashtra-tourism-development-corporation-ltd-dadar-east-mumbai-tourist-information-centres-CMVDn5iNPz.jpg",
      type: "Tourist"
    }
  ];


  const callNow = (number) => {
    window.location.href = `tel:${number}`;
  };


  return (
    <div className="emergency-page">

      {/* HEADER */}

      <div className="emergency-header">

        <div>
          <h1>Emergency Response</h1>

          <p>
            Quick access to nearby emergency and tourist assistance
          </p>
        </div>

        <div className="system-status">
          <span></span>
          System Active
        </div>

      </div>


      {/* EMERGENCY BANNER */}

      <div className="emergency-banner">

        <div className="emergency-banner-icon">
          🚨
        </div>

        <div className="emergency-banner-text">

          <h2>Need Immediate Help?</h2>

          <p>
            Contact the appropriate emergency service for quick assistance.
          </p>

        </div>

        <button
          className="emergency-call"
          onClick={() => callNow("112")}
        >
          📞 Call 112
        </button>

      </div>


      {/* CARDS */}

      <h2 className="contacts-title">
        Nearby Emergency Contacts
      </h2>


      <div className="contacts-grid">

        {contacts.map((contact, index) => (

          <div className="contact-card" key={index}>

            {/* PHOTO */}

            <div className="contact-image">

              <img
                src={contact.image}
                alt={contact.title}
              />


            </div>


            {/* CARD CONTENT */}

            <div className="contact-content">

              <h3>
                {contact.title}
              </h3>

              <p className="contact-place">
                📍 {contact.place}
              </p>

              <div className="contact-number">
                📞 {contact.number}
              </div>


              <button
                className="call-now"
                onClick={() => callNow(contact.number)}
              >
                📞 Call Now
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default EmergencyResponse;