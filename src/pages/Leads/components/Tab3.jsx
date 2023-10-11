import {
    Button,
    Card,
    Form,
    ListGroup,
    ListGroupItem,
    Tab,
} from "react-bootstrap";
import { useState } from "react";
import { useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import SearchSelect from "../../../components/SearchSelect";
import booksAPI from "../../../api/booksAPI";

export default function Tab3({ formData, setFormData }) {
    let { authToken } = useContext(AuthContext);
    // console.log(formData);

    // Products Section
    const [productOptions, setProductOptions] = useState([]);
    const [productInputValue, setProductInputValue] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);

    // const [totalAmount, setTotalAmount] = useState(0);
    // const [price, setPrice] = useState(0);
    // const [quantity, setQuantity] = useState(1);

    const [leadProducts, setLeadProducts] = useState(
        formData.lead_products.length > 0
            ? [...formData.lead_products]
            : [
                  {
                      book_id: parseInt(""),
                      price: parseFloat(""),
                      quantity: parseInt(1),
                      total_amount: parseFloat(""),
                  },
              ]
    );

    useEffect(() => {
        if (productInputValue) {
            booksAPI
                .getBookByName(authToken, productInputValue)
                .then((data) => {
                    const productOptions = data.books?.map((item, index) => ({
                        value: item.id,
                        label: item.title,
                        index: index,
                    }));
                    setProductOptions(productOptions);
                    setProducts(data.books);
                });
        }
    }, [productInputValue]);

    const handleProductInputChange = (value) => {
        setProductInputValue(value);
    };

    const handleProductChange = (selectedOption, index) => {
        // console.log(`Option selected:`, selectedOption);
        let leadProductsArr = [...leadProducts];
        if (leadProductsArr[index]) {
            leadProductsArr[index] = {
                ...leadProductsArr[index],
                book: { title: selectedOption.label },
            };
            leadProductsArr[index].book_id = selectedOption.value;
            leadProductsArr[index].price = products[selectedOption.index].price;
            leadProductsArr[index].total_amount =
                products[selectedOption.index].price;
        }
        setLeadProducts(leadProductsArr);
        setSelectedProduct(products[selectedOption.index]);
    };

    useEffect(() => {
        // update Form data
        setFormData({
            ...formData,
            lead_products: leadProducts,
        });
    }, [leadProducts]);

    const handlePriceChange = (e, index) => {
        let leadProductsArr = [...leadProducts];
        if (leadProductsArr[index]) {
            // set Price
            leadProductsArr[index].price = e.target.value;
            // set Total Amount
            const price = e.target.value;
            const quantity = leadProductsArr[index].quantity;
            if (!isNaN(price) && !isNaN(quantity)) {
                const calculatedTotal = price * quantity;
                leadProductsArr[index].total_amount =
                    calculatedTotal.toFixed(2);
            }
        }
        setLeadProducts(leadProductsArr);
    };

    const handleQuantityChange = (e, index) => {
        console.log("index:", index);
        let leadProductsArr = [...leadProducts];
        if (leadProductsArr[index]) {
            // set Quantity
            leadProductsArr[index].quantity = e.target.value;
            // set Total Amount
            const quantity = e.target.value;
            const price = leadProductsArr[index].price;
            if (!isNaN(price) && !isNaN(quantity)) {
                const calculatedTotal = price * quantity;
                leadProductsArr[index].total_amount =
                    calculatedTotal.toFixed(2);
            }
        }
        // console.log(leadProductsArr);
        setLeadProducts(leadProductsArr);
        console.log(formData);
    };

    const handleAddMoreProduct = (e) => {
        setLeadProducts([
            ...leadProducts,
            { book_id: "", price: "", quantity: 1, total_amount: "" },
        ]);
    };

    const handleRemoveProduct = (e, index) => {
        let leadProductsArr = [...leadProducts];

        let removedItemIdArr = formData.removed_items
            ? [...formData.removed_items]
            : [];
        removedItemIdArr.push(leadProductsArr[index].id);

        leadProductsArr.splice(index, 1);
        setLeadProducts(leadProductsArr);
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                removed_items: removedItemIdArr,
            };
        });
    };

    // End Products Section

    return (
        <Card
            className="shadow-sm p-4"
            style={{
                background: "white",
                height: "fit-content",
            }}
        >
            <Card.Body className="">
                <div className="row gap-4">
                    <div className="col-12">
                        <Button
                            variant="success"
                            size="sm"
                            onClick={handleAddMoreProduct}
                        >
                            Add More
                        </Button>

                        <ListGroup variant="flush">
                            {leadProducts?.map((product, index) => (
                                <ListGroupItem key={index}>
                                    <Form.Label className="d-flex justify-content-between">
                                        <span>#{index + 1}) Product Name</span>
                                        <span>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={(e) =>
                                                    handleRemoveProduct(
                                                        e,
                                                        index
                                                    )
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </span>
                                    </Form.Label>
                                    <SearchSelect
                                        defaultValue={{
                                            value: product.book?.id,
                                            label: product.book?.title,
                                        }}
                                        options={productOptions}
                                        onChange={(e) =>
                                            handleProductChange(e, index)
                                        }
                                        onInputChange={handleProductInputChange}
                                    />

                                    {product.price ? (
                                        <>
                                            <div className="col-12 d-flex justify-content-between">
                                                <div className="col-5">
                                                    <Form.Group>
                                                        <Form.Label>
                                                            Price
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            onChange={(e) =>
                                                                handlePriceChange(
                                                                    e,
                                                                    index
                                                                )
                                                            }
                                                            value={
                                                                product.price
                                                            }
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </div>
                                                <div className="col-5">
                                                    <Form.Group>
                                                        <Form.Label>
                                                            Quantity
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            onChange={(e) =>
                                                                handleQuantityChange(
                                                                    e,
                                                                    index
                                                                )
                                                            }
                                                            value={
                                                                product.quantity
                                                            }
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <Form.Group>
                                                    <Form.Label>
                                                        Amount
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        value={
                                                            product.price *
                                                            product.quantity
                                                        }
                                                        readOnly
                                                    ></Form.Control>
                                                </Form.Group>
                                            </div>
                                        </>
                                    ) : null}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}
