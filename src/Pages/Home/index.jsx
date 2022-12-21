import React, { useEffect, useState } from "react";
import "./Home.css";
import SmartDataTable from "react-smart-data-table";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { categoryData, prodcutAddHandler, prodcutData } from "../../service/auth.service";
const Home = () => {
  const [category, setCategory] = useState([]);
  const [productName, setProductName] = useState();
  const [productCodeName, setProductCodeName] = useState();
  const [productCodeNameErr, setProductCodeNameErr] = useState();
  const [productNameErr, setProductNameErr] = useState();
  const [categoryName, setCategoryName] = useState();
  const [categoryNameErr, setCategoryNameErr] = useState();
  const [description, setDescription] = useState();
  const [descriptionErr, setDescriptionErr] = useState();
  const [price, setPrice] = useState();
  const [priceErr, setPriceErr] = useState();
  const [productMRP, setProductMRP] = useState();
  const [productMRPErr, setProdcutMRPErr] = useState();
  const [currentlyAvailable, setcurrentlyAvailable] = useState();
  const [currentlyAvailablePErr, setcurrentlyAvailableErr] = useState();
  const [productTargetGRP, setproductTargetGRP] = useState();
  const [productTargetGRPErr, setproductTargetGRPErr] = useState();

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [offset, setOffSet] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const headers = {
    columnKey: {
      text: "No",
      sortable: (a, b) => b["No"] - a["No"],
      filterable: true,
    },
  };
  const testData = [
    {
      columnKey: 1,
      productName: "Test1",
      productCategory: "Test",
      description: "test",
      price: 122,
    },
    {
      columnKey: 1,
      productName: "Test1",
      productCategory: "Test",
      description: "test",
      price: 122,
    },
    {
      columnKey: 1,
      productName: "Test1",
      productCategory: "Test",
      description: "test",
      price: 122,
    },
    {
      columnKey: 1,
      productName: "Test1",
      productCategory: "Test",
      description: "test",
      price: 122,
    },
  ];
  useEffect(() => {
    getData(pageCount);
    getCategoryData();
  }, []);
  const validation = () => {
    let formisValid = true;
    if (!productName) {
      setProductNameErr("Please enter product name");
      formisValid = false;
    } else {
      setProductNameErr("");
    }
    if (!categoryName) {
      setCategoryNameErr("Please enter category");
      formisValid = false;
    } else {
      setCategoryNameErr("");
    }
    if (!description) {
      setDescriptionErr("Please enter description");
      formisValid = false;
    } else {
      setDescriptionErr("");
    }
    if (!price) {
      setPriceErr("Please enter price");
      formisValid = false;
    } else {
      setPriceErr("");
    }
    if (!productMRP) {
      setProdcutMRPErr("Please enter productMRP");
      formisValid = false;
    } else {
      setProdcutMRPErr("");
    }
    if (!currentlyAvailable) {
      setcurrentlyAvailableErr("Please enter currentlyAvailable");
      formisValid = false;
    } else {
      setcurrentlyAvailableErr("");
    }
    if (!productTargetGRP) {
      setproductTargetGRPErr("Please enter currentlyAvailable");
      formisValid = false;
    } else {
      setproductTargetGRPErr("");
    }
    if (!productCodeName) {
      setProductCodeNameErr("Please enter product code");
      formisValid = false;
    } else {
      setProductCodeNameErr("");
    }
    return formisValid;
  };
  const logout = () => {

    localStorage.clear();

    navigate("/");
  };
  const getData = async (pageCount) => {

    const response = await prodcutData(pageCount);

    // const slice = testData.slice(offset, perPage + offset);
    setData(response[1]);
    setPageCount(Math.ceil(response[0] / perPage));
  };

  const getCategoryData = async () => {
    const response = await categoryData();
    console.log(response)
    setCategory(response)
  };
  const handlePageClick = (e) => {
    //  console.log(e.selected)
    //   const count = Math.ceil(data.length / perPage);
    //   console.log("count", count)
    setPageCount(e.selected);
    getData(e.selected)
  };
  const handleSubmit = (e) => {
    if (validation()) {
      postData(e);
      setProductName("");
      setCategoryName("");
      // console.log("email", email);
      // console.log("password", password);
    }
    e.preventDefault();
  };
  const postData = async (event) => {
    event.preventDefault();

    const body = {
      "productCode": parseInt(productCodeName),
      "productName": productName,
      "productMRP": parseInt(productMRP),
      "productPrice": parseInt(price),
      "productCategoryId": categoryName,
      "productTargetGRP": productTargetGRP,
      "productDescription": description,
      "currentlyAvailable": currentlyAvailable
    };
    const response = await prodcutAddHandler(body); // eslint-disable-next-line
    // console.log(response);
    setPageCount(0);
    getData(0);
      document.getElementById("exampleModal").classList.remove('show');
      document.body.removeChild(document.getElementsByClassName("modal-backdrop")[0]);
    if (response) {
      getData(0);
      document.getElementById("exampleModal").classList.remove('show');
      document.body.removeChild(document.getElementsByClassName("modal-backdrop")[0]);
    } else {
      console.log("err")

    }
  };

  const closeHandler = () => {
    setProductName("");
    setCategoryName("");
    setProductNameErr("");
    setCategoryNameErr("");
    setDescription("");
    setDescriptionErr("");
    setPriceErr("");
    setproductTargetGRPErr("");
    setcurrentlyAvailableErr("");
    setProdcutMRPErr("");
    setProductCodeName("");
    setCategoryName("");
    setPrice("");
    setCategoryNameErr("");
    setcurrentlyAvailable("");
    setcurrentlyAvailableErr("");
    setproductTargetGRP("")

  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Hello, {JSON.parse(localStorage.getItem("userData"))?.Username}</a>
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="section">
        <h3>Products List</h3>

        {localStorage.getItem("role") === "ADMIN" ?
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"

          >
            Add Products
          </button> : null}
      </div>
      <div className="tabledata">
        <SmartDataTable
          headers={headers}
          className="table"
          data={data}
          name="test-table"
          sortable
        />
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={3}
          pageRangeDisplayed={5}
          onPageChange={(e) => handlePageClick(e)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>

      <div
        className="modal fade "
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"


      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Products
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              method="post"
            >
              <div className="modal-body">
                <div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter Product Name"
                      value={productName}
                      onChange={(e) => [
                        setProductName(e.target.value),
                        setProductNameErr(""),
                      ]}
                    />
                  </div>
                  <div className="errorstyle">{productNameErr}</div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Product Code
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter Product Code"
                      value={productCodeName}
                      onChange={(e) => [
                        setProductCodeName(e.target.value),
                        setProductCodeNameErr("")
                      ]}
                    />
                  </div>
                  <div className="errorstyle">{productCodeNameErr}</div>
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Product Category
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => [
                      setCategoryName(e.target.value),
                      setCategoryNameErr(""),
                    ]}
                  >
                    <option selected>Select Product Category</option>



                    {category.map((data) => (
                      <option value={data.productCategoryId}>{data.categoryName
                      }</option>
                    ))}
                  </select>
                  <div className="errorstyle">{categoryNameErr}</div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Product Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter Product Description"
                    value={description}
                    onChange={(e) => [
                      setDescription(e.target.value),
                      setDescriptionErr(""),
                    ]}
                  />
                </div>
                <div className="errorstyle">{descriptionErr}</div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Product Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter Product Price"
                    value={price}
                    onChange={(e) => [
                      setPrice(e.target.value),
                      setPriceErr(""),
                    ]}
                  />
                </div>
                <div className="errorstyle">{priceErr}</div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Product MRP
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter Product MRP"
                    value={productMRP}
                    onChange={(e) => [
                      setProductMRP(e.target.value),
                      setProdcutMRPErr(""),
                    ]}
                  />
                </div>
                <div className="errorstyle">{productMRPErr}</div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Currently Available
                  </label>

                  <select
                    className="form-select"
                    aria-label="Currently Available"
                    onChange={(e) => [
                      setcurrentlyAvailable(e.target.value),
                      setcurrentlyAvailableErr(""),
                    ]}
                  >
                    <option selected>Currently Available </option>
                    <option value={"Y"}>Yes</option>
                    <option value={"N"}>No</option>


                    {/* {data.map((data) => (
                      <option value={3}>{data.name}</option>
                    ))} */}
                  </select>
                </div>
                <div className="errorstyle">{currentlyAvailablePErr}</div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Product TargetGRP
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Product TargetGRP"
                    value={productTargetGRP}
                    onChange={(e) => [
                      setproductTargetGRP(e.target.value),
                      setproductTargetGRPErr(""),
                    ]}
                  />
                </div>
                <div className="errorstyle">{productTargetGRPErr}</div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => closeHandler()}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>{" "}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
