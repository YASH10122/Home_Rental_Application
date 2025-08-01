import "../styles/CreateListing.scss";
import AdminNavbar from "../components/AdminNavbar";
import { categories, types, facilities } from "../data";
import axios from 'axios';
import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
//import variables from "../styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ResponsiveTable } from "responsive-table-react";
//import Footer from "../components/Footer"

const columns = [
  
  {
    id: "category",
    text: "category",
  },
  {
    id: "aptSuite",
    text: "aptSuite",
  },
  {
    id: "city",
    text: "city",
  },
  {
    id: "country",
    text: "country",
  },
  {
    id: "guestCount",
    text: "guestCount",
  },
  {
    id: "bedroomCount",
    text: "bedroomCount",
  },
  {
    id: "bedCount",
    text: "bedCount",
  },
  {
    id: "bathroomCount",
    text: "bathroomCount",
  },
  {
    id: "title",
    text: "title",
  },
  {
    id: "description",
    text: "description",
  },
  {
    id: "price",
    text: "price",
  },
  {
    id: "edit",
    text: "Edit",
  },
  {
    id: "delete",
    text: "Delete",
  },
];

const CreateListing = () => {




  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [data1, setData1] = useState([]);
  const [id, setId] = useState();
  console.log(id);




  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:4546/properties/');
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      console.log(data); // Print the fetched data to the console

      // Update the state with the fetched data
      const formattedData = data.map((item) => ({
        aptSuite: `${item?.aptSuite}`,
        bathroomCount: `${item?.bathroomCount}`,
        bedroomCount: `${item?.bedroomCount}`,
        bedCount: `${item?.bedCount}`,
        category: `${item?.category}`,
        guestCount: `${item?.guestCount}`,
        description: `${item?.description}`,
        country: `${item?.country}`,
        city: `${item?.city}`,
        title: `${item?.title}`,
        price:`${item?.price}`,
        edit: <buttton onClick={() => {
          // console.log(item._id)
          setId(item?._id);
          setFormDescription({
            title: item.title,
            description: item.description,
            price: item.price || 0,
          });
          setGuestCount(item?.guestCount)
          setBathroomCount(item?.bathroomCount)
          setBedCount(item?.bedCount)
          setBedroomCount(item?.bedroomCount)
          setFormLocation({
            streetAddress: item?.streetAddress,
            aptSuite: item?.aptSuite,
            city: item?.city,
            country: item?.country,
          })

        }}>Edit</buttton>,
        delete: <button type="button" onClick={() => {
          fetch(`http://localhost:4546/properties/${item._id}`, {
            method: 'DELETE',
          }).then(fetchProperties())
        }}>Del</button>
      }));

      setData1(formattedData); // Set the formatted data to state
    } catch (error) {
      console.error('Fetch failed:', error.message);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);


  console.log(data1);

  // const data1 = [];

  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    country: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };



  /* BASIC COUNTS */
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);

  /* AMENITIES */
  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  const creatorId = useSelector((state) => state.user._id);

  const navigate = useNavigate();

  const handlePost = async () => {
    // e.preventDefault();

    try {
      /* Create a new FormData onject to handle file uploads */
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("price", formDescription.price);

      /* Append each selected photos to the FormData object */
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });

      /* Send a POST request to server */
      const response = await fetch("http://localhost:4546/properties/create", {
        method: "POST",
        body: listingForm,
      });

      if (response.ok) {
        navigate("/admin");
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };

  const handleEdit = async () => {
    // e.preven
    try {

      console.log({
        "streetAddress": formLocation.streetAddress,
        "aptSuite": formLocation.aptSuite,
        "city": formLocation.city,
        "country": formLocation.country,
        "guestCount": guestCount,
        "bedroomCount": bedroomCount,
        "bedCount": bedCount,
        "bathroomCount": bathroomCount,
        "title": formDescription.title,
        "description": formDescription.description,
        "price": formDescription.price,
      });

      const response = await fetch(`http://localhost:4546/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({
          "streetAddress": formLocation.streetAddress,
          "aptSuite": formLocation.aptSuite,
          "city": formLocation.city,
          "country": formLocation.country,
          "guestCount": guestCount,
          "bedroomCount": bedroomCount,
          "bedCount": bedCount,
          "bathroomCount": bathroomCount,
          "title": formDescription.title,
          "description": formDescription.description,
          "price": formDescription.price,
        }),
      });

      if (response.ok) {
        navigate("/admin");
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  }
  return (
    <>
      <AdminNavbar />

      <div className="create-listing">
        <h1>Publish Your Place</h1>
        <form >
          <div className="create-listing_step1">
            <h2>Step 1: Tell us about your place</h2>
            <hr />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${category === item.label ? "selected" : ""
                    }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will guests have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Where`s your place located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Apartment, Suite </p>
                <input
                  type="text"
                  placeholder="Apt, Suite"
                  name="aptSuite"
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
              <div className="location">
                {/* <p>Country</p> */}
                {/* <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                /> */}
              </div>
            </div>

            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                  // sx={{
                  //   fontSize: "25px",
                  //   cursor: "pointer",
                  //   "&:hover": { color: variables.pinkred },
                  // }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                  // sx={{
                  //   fontSize: "25px",
                  //   cursor: "pointer",
                  //   "&:hover": { color: variables.pinkred },
                  // }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bedrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedroomCount > 1 && setBedroomCount(bedroomCount - 1);
                    }}
                  // sx={{
                  //   fontSize: "25px",
                  //   cursor: "pointer",
                  //   "&:hover": { color: variables.pinkred },
                  // }}
                  />
                  <p>{bedroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedroomCount(bedroomCount + 1);
                    }}
                  // sx={{
                  //   fontSize: "25px",
                  //   cursor: "pointer",
                  //   "&:hover": { color: variables.pinkred },
                  // }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Beds</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bedCount > 1 && setBedCount(bedCount - 1);
                    }}
                  // sx={{
                  //   fontSize: "25px",
                  //   cursor: "pointer",
                  //   "&:hover": { color: variables.pinkred },
                  // }}
                  />
                  <p>{bedCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBedCount(bedCount + 1);
                    }}
                  // sx={{
                  //   fontSize: "25px",
                  //   cursor: "pointer",
                  //   "&:hover": { color: variables.pinkred },
                  // }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Bathrooms</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      bathroomCount > 1 && setBathroomCount(bathroomCount - 1);
                    }}
                  // sx={{
                  //   fontSize: "25px",
                  //   cursor: "pointer",
                  //   "&:hover": { color: variables.pinkred },
                  // }}
                  />
                  <p>{bathroomCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setBathroomCount(bathroomCount + 1);
                    }}
                  // sx={{
                  //   fontSize: "25px",
                  //   cursor: "pointer",
                  //   "&:hover": { color: variables.pinkred },
                  // }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <hr />

            <h3>Tell guests what your place has to offer</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${amenities.includes(item.name) ? "selected" : ""
                    }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3>What make your place attractive and exciting?</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
              <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />


              <p>Now, set your PRICE</p>
              <span>₹</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                className="price"
                required
              />
            </div>
          </div>

          {/* {id != undefined ? <>
          </> : <></>} */}

          <button className="submit_btn" type="button" onClick={() => {
            if (id != undefined) {
              console.log("not undfnd");
              handleEdit()

            } else {
              handlePost()
            }
          }}>
            {id != undefined ? "UPDATE" : "CREATE"}
            YOUR LISTING
          </button>
        </form>
        <div className="report-container" id="report" style={{ overflowX: "scroll", margin: "20px 0", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
          <ResponsiveTable columns={columns} data={data1} />
        </div>
      </div>

      {/* /<Footer /> */}
    </>
  );
};

export default CreateListing;