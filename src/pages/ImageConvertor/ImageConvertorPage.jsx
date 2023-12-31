import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import BASEURL from '../../constant/BaseApi';
import loading from '../../assets/loading.gif';
import plane from '../../assets/spaceship.svg';

const ImageConvertorPage = ({ theme, click }) => {
  const [ImageSore, setImageStore] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [reducedImage, setReducedImage] = useState(null);
  const [size, setSize] = useState('');
  const [Loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    // setSelectedImage(event.target.files[0]);
    handleFileChange(e);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedImage(true);
      setImageStore(e.target.files[0]);
    } else {
      setSelectedImage(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedImage(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (selectedImage) {
      if (!size) {
        window.alert('Please select a size');
        return;
      }

      try {
        setLoading(true); // Start loading indicator

        const formData = new FormData();
        formData.append('image', ImageSore); // Use selectedImage instead of ImageSore
        formData.append('desiredSize', size);

        const response = await axios.post(`${BASEURL}image/reduce`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'arraybuffer',
        });

        const reducedImageDataUrl = `data:image/jpeg;base64,${btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )}`;

        setReducedImage(reducedImageDataUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false); // Stop loading indicator when done
      }
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = reducedImage;
    link.download = 'reduced_image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative  w-full flex flex-col    ">
      <div className=" md:mt-8  dark:bg-[#b5a5fcc4] backdrop-blur-sm  bg-white/30 w-screen p-[1rem] flex justify-evenly">
        <div className=" flex flex-col   h-full  w-screen md:flex-row md:justify-evenly items-center  ">
          <h1
            className={`${
              theme === 'dark' ? 'light-gradient' : 'blue-gradient'
            }  flex text-2xl md:text-2xl  font-bold   text-white  font-roboto px-4 py-2 mb-5 md:py-2 md:px-4 rounded-md `}
          >
            Image Converter
          </h1>
          <div className="md:w-[30%] w-[20rem]">
            <p className=" text-white font-normal">
              Are you tired of struggling with incompatible image formats? Say
              hello to Image Converter Pro, your ultimate solution for seamless
              image format conversion!
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center h-[40rem] mt-8 md:mt-0">
        <div className="absolute left-[4rem] md:left-[10rem] md:top-[10rem] top-[18rem] w-[400px] ">
          <img src={plane} />
        </div>
        <div className="flex flex-col items-center  mt-8  z-[1] ">
          <div className="mb-4 space-x-4 ">
            <button
              onClick={() => {
                setSize(50);
              }}
              className={`${
                +size === 50
                  ? 'bg-green-500 dark:bg-black text-black dark:text-white'
                  : `${
                      theme === 'dark' ? 'light-gradient' : 'blue-gradient'
                    }  text-white`
              }  py-2 px-4 rounded`}
            >
              50
            </button>
            <button
              onClick={() => {
                setSize(100);
              }}
              className={`${
                +size === 100
                  ? 'bg-green-500 dark:bg-black text-black dark:text-white'
                  : `${
                      theme === 'dark' ? 'light-gradient' : 'blue-gradient'
                    }  text-white`
              }  py-2 px-4 rounded`}
            >
              100
            </button>
            <button
              onClick={() => {
                setSize(200);
              }}
              className={`${
                +size === 200
                  ? 'bg-green-500 dark:bg-black text-black dark:text-white'
                  : `${
                      theme === 'dark' ? 'light-gradient' : 'blue-gradient'
                    }  text-white`
              }  py-2 px-4 rounded`}
            >
              200
            </button>
          </div>

          <div className="mb-4">
            <input
              type="number"
              placeholder="Enter the custom size"
              onChange={(e) => {
                setSize(e.target.value);
              }}
              className="py-2 px-4 border border-blue-600 rounded focus:border-blue-500 placeholder:text-blue-500"
            />
          </div>

          <div
            className={`hidden  justify-center items-center flex-col   md:inline-flex   border-dashed border-2 border-white px-[5rem] py-[2rem] backdrop-blur-sm  ${
              theme === 'dark' ? 'bg-[#a79df540]' : 'bg-white/30'
            } dark:#a79df540 `}
          >
            <label
              htmlFor="fileInput"
              className={`relative cursor-pointer px-[0.5rem] py-[0.5rem] shadow-md hover:bg-blue-600 ${
                selectedImage
                  ? 'bg-green-500 dark:bg-gray-700  text-white'
                  : `${
                      theme === 'dark' ? 'light-gradient' : 'blue-gradient'
                    }  text-white`
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <span className="absolute inset-0"></span>
              {selectedImage ? 'File Selected' : 'Choose a File'}
              <input
                type="file"
                id="fileInput"
                className="absolute invisible"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
            <p className="m-2 text-white dark:text-black">
              Drag and drop an image here or click to select one.
            </p>
          </div>
          <div className="my-8 block md:hidden">
            <label
              htmlFor="fileInput"
              className={`relative cursor-pointer px-[0.5rem] py-[0.5rem] shadow-md hover:bg-blue-600 ${
                selectedImage
                  ? 'bg-green-500 dark:bg-gray-700  text-white'
                  : `${
                      theme === 'dark' ? 'light-gradient' : 'blue-gradient'
                    }  text-white`
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <span className="absolute inset-0"></span>
              {selectedImage ? 'File Selected' : 'Choose a File'}
              <input
                type="file"
                id="fileInput"
                className="absolute invisible"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div className="mt-4 ">
            {/* <button
              onClick={
                reducedImage ? (Loading ? null : handleDownload) : handleUpload
              }
              className={`py-2 px-4 rounded hover:bg-blue-200 ${
                reducedImage && !Loading
                  ? 'bg-red-500 text-white'
                  : `${
                      theme === 'dark' ? 'light-gradient' : 'blue-gradient'
                    } text-white`
              }`}
            >
              {reducedImage ? (
                Loading ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  'Download'
                )
              ) : (
                'Convert Image'
              )}
            </button> */}
            <button
              onClick={
                reducedImage ? (Loading ? null : handleDownload) : handleUpload
              }
              className={`py-2 px-4 rounded hover:bg-blue-200 ${
                reducedImage && !Loading
                  ? 'bg-red-500 text-white'
                  : `${
                      theme === 'dark' ? 'light-gradient' : 'blue-gradient'
                    } text-white`
              }`}
            >
              {Loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              ) : reducedImage ? (
                'Click To Download Image'
              ) : (
                'Convert Image'
              )}
            </button>
          </div>
          <div
            className={`w-full ${
              click === true ? 'block' : 'hidden'
            } h-20 border border-black mt-5 bg-black text-[#048738] text-center`}
          >
            <span className="text-white underline">Contributors</span>
            <div className="flex w-[40rem] justify-center gap-8 flex-wrap">
              <p>Tanweer Khan</p>
              <p>Tehseem Ahmed</p>
              <p>Saket Jha</p> <p>Ujjwal Dhiman</p> <p>Shanika Singh</p>
            </div>
          </div>
        </div>

        {/* <div className="w-screen flex h-auto items-center  justify-center mt-8">
        <div className="md:w-[75rem] w-[20rem] md:h-50 h-auto h-screen grid  grid-cols-1 md:grid-cols-2 grid-rows-1  md:grid-rows-2 gap-4">
            <div className="flex md:flex-row flex-col w-full h-full items-center gap-[6rem] justify-center items-center ">
              <div className="text-[6rem] ml-8 ">
                <i className="fa-solid fa-file"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold ">+100 Formats Supported</h2>
                CloudConvert serves as your all-encompassing solution for file
                conversions, accommodating a wide range of formats including
                audio, video, documents, ebooks, archives, images, spreadsheets,
                and presentations. Our user-friendly online tool enables you to
                perform conversions effortlessly without the need for any
                software downloads or installations.
              </div>
            </div>
            <div className=" flex md:flex-row flex-col  h-full items-center gap-[6rem] ">
              <div className="text-[6rem] ml-8">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold ">Data Security</h2>
                CloudConvert, established in 2012, has earned the trust of our
                users and customers over the years. Our commitment to your
                privacy is unwavering - your files are yours and yours alone,
                with no access granted to anyone else. We sustain our operations
                by providing access to our API, without ever compromising your
                data's security or selling it to third parties. You can learn
                more about our approach in our detailed documentation.
              </div>
            </div>
            <div className=" flex md:flex-row flex-col  h-full items-center gap-[6rem] ">
              <div className="text-[6rem] ml-8">
                <i className="fa-solid fa-gears"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold ">
                  High-Quality Conversions
                </h2>
                CloudConvert leverages open-source software and collaborates
                with trusted software vendors to provide top-tier conversion
                services. Our platform offers extensive customization options,
                allowing you to adjust settings like quality to match your
                precise needs. We prioritize user-centric flexibility and
                quality in all conversions.
              </div>
            </div>
            <div className=" flex md:flex-row flex-col h-full items-center gap-[6rem] ">
              <div className="text-[6rem] ml-8">
                <i className="fa-solid fa-boxes-packing"></i>
              </div>
              <div>
                <h2 className="text-2xl font-bold ">Powerful API</h2>
                CloudConvert's API offers seamless integration capabilities with
                your application, ensuring that you pay solely for the resources
                you utilize. For high-volume customers, we offer substantial
                discounts, making our services cost-effective and scalable.
                Additionally, we provide valuable features like seamless Amazon
                S3 integration, enhancing your conversion experience.
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ImageConvertorPage;
