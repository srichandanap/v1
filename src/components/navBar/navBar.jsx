import React, { useState, useEffect } from 'react'
import "./navBar.css"
import navLogo from "../../asstes/images/Group 118.png"
import bell from "../../asstes/images/Bell.png"
import setting from "../../asstes/images/Gear.png"
import search from "../../asstes/images/MagnifyingGlass.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import searchClose from "../../asstes/images/X.png";
import rec from "../../asstes/images/Rectangle 28.png";
import script from "../../asstes/images/script.png";
import pen from "../../asstes/images/pen.png";
import filter from "../../asstes/images/Path_15.png";
import filterClose from "../../asstes/images/filterClose.png";
import { addId } from "../../slive/courseSlice";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const [profile, setProfile] = useState();
  const [searchListData, setSearchListData] = useState();
  const [inputValue, setInputValue] = useState(null);
  const [searchListModal, setSearchListModal] = useState(false);
  const [emptySearchModal, setEmptySearchModal] = useState(false);
  const [category, setCategory] = useState();
  const [catShow, setCatShow] = useState(null);
  const [catOne, setCatOne] = useState(false);
  const [catTwo, setCatTwo] = useState(false);
  const [catThree, setCatThree] = useState(false);
  const [catFour, setCatFour] = useState(false);
  const [catFive, setCatFive] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [desigOne, setDesigOne] = useState(false);
  const [desigTwo, setDesigTwo] = useState(false);
  const [topSearch, setTopSearch] = useState(false);
  const [filterList, setFilterList] = useState(false);
  const [filterData, setFilterData] = useState();

  // const [filterObj, setFilterObject] = useState([{
  //   startDuration: "",
  //   endDuration: ""
  // }]);

  const filterObj = []
  const catId = [];

  var searchValue = "";

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchValue = e.target.search.value;

    searchSubmit();
    setEmptySearchModal(false)
    setSearchListModal(true)
    setFilterList(false)
  }

  const handleFilter = () => {

    if (catOne) {
      let newFil1 = { startDuration: 5, endDuration: 10 };
      filterObj.push(newFil1);
    }

    if (catTwo) {
      let newFil2 = { startDuration: 10, endDuration: 20 };
      filterObj.push(newFil2);
    }

    if (catThree) {
      let newFil3 = { startDuration: 20, endDuration: 30 };
      filterObj.push(newFil3);
    }

    if (catFour) {
      let newFil4 = { startDuration: 30, endDuration: 40 };
      filterObj.push(newFil4);
    }

    if (catFive) {
      let newFil5 = { startDuration: 50, endDuration: 100 };
      filterObj.push(newFil5);
    }

    if (desigOne) {
      let newCatId = 1;
      catId.push(newCatId);
    }

    if (desigTwo) {
      let newCatId2 = 2;
      catId.push(newCatId2);
    }

    // console.log(filterObj);
    // console.log(catId);
    apply(); setCatOne(false); setCatTwo(false); setCatThree(false); setCatFour(false); setCatFive(false); setDesigOne(false); setDesigTwo(false);
    setFilterModal(false);
    setFilterList(true);
    setEmptySearchModal(false);
    setSearchListModal(false);

  }

  const apply = async () => {

    await axios
      .request(
        `https://app-virtuallearning-230106135903.azurewebsites.net/user/view/search`,

        {
          method: "post",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
            'Content-Type': 'application/json'
          },
          data: {

            "searchOption": "",

            "categories": catId,

            "durationRequestList": filterObj

          }
        }
      )
      .then((res) => {
        console.log(res);
        setFilterData(res?.data);

      })
      .catch((err) => {
        console.log(err);
      });


  };


  useEffect(() => {
    axios
      .get(
        `https://app-virtuallearning-230106135903.azurewebsites.net/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setProfile(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://app-virtuallearning-230106135903.azurewebsites.net/user/view/topSearches`,

      )
      .then((res) => {
        console.log(res);
        setTopSearch(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  const searchSubmit = async () => {
    await axios
      .request(
        `https://app-virtuallearning-230106135903.azurewebsites.net/user/view/search`,
        {
          method: "post",
          headers: {
            // Authorization: `Bearer ${sessionStorage.getItem('auth')}`,
            'Content-Type': 'application/json'
          },
          data: {
            "searchOption": searchValue
          }

        }
      ).then((res) => {
        console.log(res);
        setSearchListData(res?.data);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://app-virtuallearning-230106135903.azurewebsites.net/user/view/categories`,

      )
      .then((res) => {
        console.log(res);
        setCategory(res);

      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <div className='nav' id='nav' style={{ height: (searchListModal) || emptySearchModal || filterList ? "auto" : "" }}>
        <div className='navMargin' style={{ alignItems: (searchListModal) || emptySearchModal || filterList ? "unset" : "center" }}>
          <img src={navLogo} alt="img" className="navImage" onClick={() => { navigate("/homePage") }} />
          <div className='searchList'>
            <div className='searchWithFilter'>
              <div className="searchImage">
                <form className='searchForm' onSubmit={handleSearchSubmit}>
                  <button className='searchs' type='submit'>
                    <img src={search} alt="img" className='searchs' />
                  </button>

                  <input
                    autoComplete="off"
                    type="text"
                    className="searchBar"
                    placeholder="Search"
                    id="search"
                    name="search"
                    value={inputValue}
                    onChange={(e) => {setInputValue(e.target.value); setEmptySearchModal(true); setSearchListModal(false); setFilterList(false) }}
                  />
                </form>
              </div>
              {(searchListModal || emptySearchModal || filterList) && (
                <div className='orangeBg' onClick={() => { setFilterModal(true); }} >
                  <img src={filter} alt="image" className='filterImg' />
                </div>
              )}
            </div>

            {emptySearchModal && (
              <>
                {topSearch?.length === 0 ?
                  (
                    <>
                      <div className='noMatchingDiv'>
                        <div className='noMatchingText'>No top courses</div>
                      </div>
                    </>
                  )
                  :
                  (
                    <>
                      <div className='topSearchCat'>
                        <div className='searchCatText'>Top Search</div>
                        <div className='categoriesSearch'>
                          {topSearch?.map((data) => {
                            return (
                              <div className='topSearch' onClick={() => {
                                searchValue = data;
                                setInputValue(data);
                                searchSubmit();
                                setEmptySearchModal(false);
                                setSearchListModal(true);
                                setFilterList(false);
                              }}>
                                <div>{data}</div>
                              </div>

                            )
                          })}
                        </div>
                      </div>
                    </>
                  )


                }
                <div className='searchCat'>
                  <div className='searchCatText'>Search from Categories</div>
                  <div className='categoriesSearch'>
                    {category?.data?.map((data) => {
                      return (
                        <div className='categoriesItemSearch'>
                          {/* <img src={pen} alt="image" /> */}
                          {(() => {
                            switch (data?.categoryName) {
                              case 'Design':
                                return <img className="fb_img" src={pen} alt="image" />
                              case 'Development':
                                return <img className="fb_img" src={script} alt="imge" />
                              default:
                                return null
                            }
                          })()}

                          <div>{data?.categoryName}</div>
                        </div>

                      )
                    })}
                  </div>
                </div>


              </>
            )}


            {filterModal && (
              <>

                <div class="overlayFil">
                  <div className='modalFilter'>
                    <img src={filterClose} alt="image" className='filterClose' onClick={() => { setFilterModal(false); setCatOne(false); setCatTwo(false); setCatThree(false); setCatFour(false); setCatFive(false); setDesigOne(false); setDesigTwo(false); }} />
                    <div className='SearchFilText'>Search Fillters</div>
                    {/* <div className='srchCat'>Search from Categories</div> */}
                    <div className='searchCat'>
                      <div className='srchCat'>Search from Categories</div>
                      <div className='categoriesSearch'>
                        <div className='categoriesItemSearchModal' onClick={() => { setDesigOne(true) }} style={{ backgroundColor: desigOne ? "#FCBE4B" : "#FFFFFF" }}>
                          <img src={pen} alt="image" />
                          <div className='filDesign'>Design</div>
                        </div>
                        <div className='categoriesItemSearchModal' onClick={() => { setDesigTwo(true) }} style={{ backgroundColor: desigTwo ? "#FCBE4B" : "#FFFFFF" }}>
                          <img src={script} alt="image" />
                          <div className='filDesign'>Development</div>
                        </div>
                      </div>
                    </div>
                    <div className='searchCatDuration'>

                      <div className='srchCat'>Duration</div>
                      <div className='categoriesSearch'>
                        <div className='categoriesItemSearchModal' onClick={() => { setCatOne(true) }} style={{ backgroundColor: catOne ? "#FCBE4B" : "#FFFFFF" }}>
                          <div className='filDuration'>5/10 Chapters</div>
                        </div>
                        <div className='categoriesItemSearchModal' onClick={() => { setCatTwo(true) }} style={{ backgroundColor: catTwo ? "#FCBE4B" : "#FFFFFF" }}>
                          <div className='filDuration'>10/20 Chapters</div>
                        </div>
                        <div className='categoriesItemSearchModal' onClick={() => { setCatThree(true) }} style={{ backgroundColor: catThree ? "#FCBE4B" : "#FFFFFF" }}>
                          <div className='filDuration'>20/30 Chapters</div>
                        </div>
                        <div className='categoriesItemSearchModal' onClick={() => { setCatFour(true) }} style={{ backgroundColor: catFour ? "#FCBE4B" : "#FFFFFF" }}>
                          <div className='filDuration'>30/40 Chapters</div>
                        </div>
                        <div className='categoriesItemSearchModal' onClick={() => { setCatFive(true) }} style={{ backgroundColor: catFive ? "#FCBE4B" : "#FFFFFF" }}>
                          <div className='filDuration'>50+Chapters</div>
                        </div>
                      </div>
                    </div>
                    <div className='modalBtn'>
                      <button className='reSubBtnFil' onClick={() => {
                        if (catOne === false && catTwo === false && catThree === false && catFour === false && catFive === false && desigOne === false && desigTwo === false) {

                        }
                        else {
                          handleFilter();
                          setInputValue("");
                        }
                      }}>Apply Filter</button>
                      <button className='cancelBtnFil' onClick={() => { setCatOne(false); setCatTwo(false); setCatThree(false); setCatFour(false); setCatFive(false); setDesigOne(false); setDesigTwo(false) }}>Clear All</button>
                    </div>
                    {/* catOne === false  && catTwo === false && catThree === false && catFour === false && catFive === false && desigOne === false && desigTwo === false ? " ": */}
                  </div>
                </div>
              </>
            )}


            {searchListModal && (
              <>
                {searchListData?.length === 0 ?
                  (
                    <>
                      <div className='noMatchingDiv'>
                        <div className='noMatchingText'>No matching course</div>
                        <div className='tryText'>Try a different search or browse categories</div>
                      </div>
                      <div className='searchCat'>
                        <div className='searchCatText'>Search from Categories</div>
                        <div className='categoriesSearch'>
                          {category?.data?.map((data) => {
                            return (
                              <div className='categoriesItemSearch'>
                                {/* <img src={pen} alt="image" /> */}
                                {(() => {
                                  switch (data?.categoryName) {
                                    case 'Design':
                                      return <img className="fb_img" src={pen} alt="image" />
                                    case 'Development':
                                      return <img className="fb_img" src={script} alt="imge" />
                                    default:
                                      return null
                                  }
                                })()}

                                <div>{data?.categoryName}</div>
                              </div>

                            )
                          })}
                        </div>
                      </div>
                    </>
                  )
                  :
                  searchListData?.map((data, i) => {
                    return (
                      <>
                        <div className='searchedItems'>
                          <div className='searchedItem' style={{ borderBottom: ((searchListData?.length) - 1 === i) ? "none" : "1px solid #1E4284" }}
                            onClick={() => {
                              dispatch(addId(data?.courseId));
                              setEmptySearchModal(false);
                              setSearchListModal(false);
                              navigate("/overview");
                              window.location.reload();
                            }}>
                            <img src={data?.courseImage} alt="image" className='searchListImage' />
                            <div className='searchListDetailsDiv'>
                              <div className='searchedCourseName'>{data?.courseName}</div>
                              <div className='searchedChapCount'>{data?.noOfChapters} Chapter</div>
                              <div className='searchedCategory'>{data?.categoryName}</div>
                            </div>
                          </div>
                        </div>

                      </>
                    )
                  })}

              </>
            )}

            {filterList && (
              filterData?.length === 0 ? (
                <>
                  <div className='noMatchingDiv'>
                    <div className='noMatchingText'>No matching course available</div>
                    <div className='tryText'>Try different filters</div>
                  </div>
                </>
              ) :

                filterData?.map((data, i) => {
                  return (
                    <>
                      <div className='searchedItems'>
                        <div className='searchedItem' style={{ borderBottom: ((searchListData?.length) - 1 === i) ? "none" : "1px solid #1E4284" }}
                          onClick={() => {
                            dispatch(addId(data?.courseId));
                            setEmptySearchModal(false);
                            setSearchListModal(false);
                            navigate("/overview");
                            window.location.reload();
                          }}>
                          <img src={data?.courseImage} alt="image" className='searchListImage' />
                          <div className='searchListDetailsDiv'>
                            <div className='searchedCourseName'>{data?.courseName}</div>
                            <div className='searchedChapCount'>{data?.noOfChapters} Chapter</div>
                            <div className='searchedCategory'>{data?.categoryName}</div>
                          </div>
                        </div>
                      </div>

                    </>
                  )
                })
            )}


          </div>

          <div className='navRight' style={{ display: (searchListModal) || emptySearchModal || filterList ? "none" : "" }}>
            <img src={bell} alt="img" className='bell' />
            <img src={setting} alt="img" className='settings' />
            <div>
              <div class="dropdown-CV">
                <img src={profile?.profilePic} alt="img" className='profile' />

                <div class="dropdown-content-CV">
                  <div
                    onClick={() => navigate("/myCourses")}
                  >
                    MyCourses
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className='searchCloseBtn' style={{ display: (searchListModal) || emptySearchModal || filterList ? "block" : "none" }} onClick={() => { document.getElementById("nav").style.height = ""; searchValue = ""; setSearchListModal(false); setEmptySearchModal(false); setFilterList(false); setInputValue("") }}><img src={searchClose} alt='image' /></div>
        </div>



      </div>
    </div >
  )
}

export default NavBar