import Navbar from "../Navbar.jsx";
import blogbg from "../../assets/blogbg.webp";
import { useEffect, useState } from "react";
import DonationCircle from "../DonationCircle.jsx";
import Marquee from 'react-fast-marquee';
import axios from "axios";
import BgOne from '../../assets/bg2.webp'
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const backend = import.meta.env.VITE_BACKEND_URL;

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("")
  const [searchedBlogs, setSearchedBlogs] = useState([])

  async function fetchBlogs() {
    try {
      const response = await axios.get(`${backend}/admin/blog/get`)
      setBlogs(response.data.data.reverse())
    } catch (error) {
      console.log("Error while fetching blogs", error);
    }
  }

  function handleChange(e) {
    setSearch(e.target.value)
    const filteredBlogs = blogs.filter(blog => blog.title.toLowerCase().includes(e.target.value.toLowerCase()))
    setSearchedBlogs(filteredBlogs)
  }

  function timeSince(dateTimeString) {
    // Extract date and time parts
    const [datePart, timePart] = dateTimeString.split(" ");
    const [day, month, year] = datePart.split("-");
    const [hour, minute, seconds] = timePart.split(":");

    // Convert to a proper Date object (YYYY-MM-DDTHH:mm:ss format)
    const givenDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${seconds}`);

    if (isNaN(givenDate.getTime())) {
      return "Invalid Date";
    }

    const now = new Date();
    const secondsDiff = Math.floor((now - givenDate) / 1000);

    if (secondsDiff < 0) return "In the future"; // Handle future dates

    const minutes = Math.floor(secondsDiff / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} ${years === 1 ? "year" : "years"} ago`;
    if (months > 0) return `${months} ${months === 1 ? "month" : "months"} ago`;
    if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
    if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    if (minutes > 0) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    return `${secondsDiff} ${secondsDiff === 1 ? "second" : "seconds"} ago`;
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchBlogs()
  }, [])

  return (
    <div className="bg-[#fde5bc] w-full h-full" style={{
      backgroundImage: `url(${BgOne})`,
      backgroundPosition: 'top',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain'
    }}>
      <div className="px-4 md:px-20 pt-4 z-10 relative">
        <Navbar />
      </div>
      <div className="mt-10">
        <div className="w-full h-[300px] rounded-3xl relative -z-1 overflow-hidden px-4 md:px-20 ">
          <LazyLoadImage
            src={blogbg}
            alt="blog background"
            effect="blur"
            className="w-full h-full rounded-3xl object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl mx-4 md:mx-20  "></div>
        </div>
        <div className="my-10">
          <Marquee className="font-prata h-12 text-3xl text-[#ED683C]  overflow-y-hidden">
            हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण | हरे कृष्ण |
          </Marquee>
        </div>
        <div className="w-full flex justify-center items-center mt-10 px-4 md:px-20  ">
          <h1 className="font-prata text-xl text-[#3B2106] text-center">
            “The essence of devotion is in giving without expecting, loving
            without boundaries,
            <br />
            and serving without hesitation”
          </h1>
        </div>
        {/* blog */}
        <div>
          <div className=" mx-auto py-8 px-5 md:px-10 lg:px-20">
            {/* Trending Blogs */}
            <section className="md:px-4 mt-10">
              <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-10">
                <div className="w-full md:w-1/3 text-center md:text-start">
                  {
                    search.length > 0
                      ? null
                      : <h2 className="text-2xl md:text-3xl font-semibold text-[#3B2106] mb-6 font-poppins">
                        Trending Blogs
                      </h2>
                  }
                </div>
                <div className="flex flex-col md:flex-row items-center justify-end gap-4 mb-8 w-full md:w-2/3">
                  <div className="relative w-[90%] md:w-[60%] ">
                    <input
                      type="text"
                      placeholder="Search blog"
                      value={search}
                      onChange={(e) => handleChange(e)}
                      className="w-full px-4 py-2 border rounded-full shadow-sm "
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-1/2 -translate-y-1/2 right-4 h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35m2.1-6.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                      />
                    </svg>
                  </div>
                  {/* <div>
                    <select className="px-4 py-2  bg-transparent ">
                      <option value="default">Sort By: Default</option>
                      <option value="date">Date</option>
                      <option value="popularity">Popularity</option>
                    </select>
                  </div> */}
                </div>
              </div>

              {
                search.length > 0
                  ? (
                    <div className="w-full h-auto flex flex-col gap-4 lg:gap-6">
                      <h2 className="text-2xl md:text-3xl font-semibold text-[#3B2106] mb-6 font-poppins">
                        Searched Results :
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
                        {searchedBlogs.length > 0
                          ? searchedBlogs?.map((blog) => (
                            <NavLink
                              to={`/blogs/single-blog/${blog._id}`}
                              key={blog._id}
                              className=" overflow-hidden cursor-pointer transform transition duration-500 ease-out hover:scale-105 font-prata"
                            >
                              <div className="rounded-lg ">
                                <img
                                  src={blog.image[0]}
                                  alt={blog.title}
                                  effect="blur"
                                  className="w-full h-[250px] rounded-lg object-fit"
                                />
                              </div>

                              <div className="p-4">
                                <p className="text-sm text-[#4F4F4F]">
                                  {blog.createdAt.slice(0, 10)} •
                                  {timeSince(blog.createdAt)}
                                </p>
                                <h3 className="text-lg font-bold mt-2">{blog.title}</h3>
                                <p className="text-sm text-gray-700 mt-2">
                                  {blog.description.length > 200 ? blog.description.slice(0, 200) + '...' : blog.description}
                                </p>
                              </div>
                            </NavLink>
                          ))
                          : <div className="w-full h-[500px] col-span-3 flex justify-center items-center">
                            <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#3B2106] mb-6 font-poppins">
                              No results found
                            </h2>
                          </div>
                        }
                      </div>
                    </div>
                  )
                  : null
              }
              {
                search.length > 0
                  ? <h2 className="text-2xl md:text-3xl font-semibold text-[#3B2106] mb-6 font-poppins">
                    Trending Blogs
                  </h2>
                  : null
              }
              <div className="w-full flex gap-10">
                <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 ">
                  {blogs?.slice(0, 2)?.map((blog) => (
                    <NavLink
                      to={`/blogs/single-blog/${blog._id}`}
                      key={blog._id}
                      className=" overflow-hidden cursor-pointer transform transition duration-500 ease-out hover:scale-105 font-prata"
                    >
                      <div className="rounded-lg ">
                        <img
                          src={blog.image[0]}
                          alt={blog.title}
                          className="w-full h-[250px] rounded-lg object-fit"
                        />
                      </div>

                      <div className="p-4">
                        <p className="text-sm text-[#4F4F4F]">
                          {blog.createdAt.slice(0, 10)} •
                          {timeSince(blog.createdAt)}
                        </p>
                        <h3 className="text-lg font-bold mt-2">{blog.title}</h3>
                        <p className="text-sm text-gray-700 mt-2">
                          {blog.description.length > 200 ? blog.description.slice(0, 200) + '...' : blog.description}
                        </p>
                      </div>
                    </NavLink>
                  ))}
                </div>
                <aside className="w-full md:w-1/3 hidden md:block">
                  <h2 className="text-3xl font-semibold mb-6 font-poppins">
                    Related Blogs
                  </h2>
                  <div className="space-y-4">
                    {blogs?.slice(9).map((blog) => (
                      <NavLink
                        to={`/blogs/single-blog/${blog._id}`}
                        key={blog._id}
                        className="flex items-center cursor-pointer space-x-4 font-prata"
                      >
                        <div className="w-[100px] md:w-[120px] h-20 md:h-24 lg:w-[150px]">
                          <img
                            src={blog.image[0]}
                            alt={blog.title}
                            className="w-full h-full object-fit rounded-lg"
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold">{blog.title}</h3>
                          <p className="text-sm text-[#4F4F4F] mt-3">
                            {blog.createdAt.slice(0, 10)} •
                            {timeSince(blog.createdAt)}
                          </p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </aside>
              </div>
            </section>

            {/* Latest Blogs */}
            <section className="w-full mt-12">
              <h2 className="text-3xl text-[#3B2106] font-semibold mb-6 font-poppins">
                Latest Blog
              </h2>
              <div className="w-full flex flex-col md:flex-row gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full ">
                  {blogs?.slice(3, 9).map((blog) => (
                    <NavLink
                      to={`/blogs/single-blog/${blog._id}`}
                      key={blog._id}
                      className=" overflow-hidden cursor-pointer transform transition duration-500 ease-in-out hover:scale-105 font-prata"
                    >
                      <div className="rounded-lg ">
                        <img
                          src={blog.image[0]}
                          alt={blog.title}
                          className="w-full h-[250px] object-fit rounded-lg"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-[#4F4F4F]">
                          {blog.createdAt.slice(0, 10)} •
                          {timeSince(blog.createdAt)}
                        </p>
                        <h3 className="text-lg font-bold mt-2">{blog.title}</h3>
                        <p className="text-sm text-gray-700 mt-2" dangerouslySetInnerHTML={{ __html: blog.description.length > 200 ? blog.description.slice(0, 200) + '...' : blog.description }}>
                          {/* {blog.description.length > 200 ? blog.description.slice(0, 200) + '...' : blog.description} */}
                        </p>
                      </div>
                    </NavLink>
                  ))}
                </div>
                {/* Related Blogs */}
                <aside className="w-full md:w-1/3 md:hidden">
                  <h2 className="text-3xl font-semibold mb-6 font-poppins">
                    Related Blogs
                  </h2>
                  <div className="space-y-4">
                    {blogs?.slice(9).map((blog) => (
                      <NavLink
                        to={`/blogs/single-blog/${blog._id}`}
                        key={blog._id}
                        className="flex items-center cursor-pointer space-x-4 font-prata"
                      >
                        <div className="w-[100px] md:w-[120px] h-20 md:h-24 lg:w-[150px]">
                          <img
                            src={blog.image[0]}
                            alt={blog.title}
                            className="w-full h-full object-fit rounded-lg"
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-bold">{blog.title}</h3>
                          <p className="text-sm text-[#4F4F4F] mt-3">
                            {blog.createdAt.slice(0, 10)} •
                            {timeSince(blog.createdAt)}
                          </p>
                        </div>
                      </NavLink>
                    ))}
                  </div>
                </aside>
              </div>
            </section>

          </div>
        </div>

        {/* Donation Circles */}
        <DonationCircle />
      </div>

    </div>
  );
};

export default BlogPage;
