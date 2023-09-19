import { Card, Form, Tab } from "react-bootstrap";
import { useState } from "react";
import { useEffect, useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import SearchSelect from "../../../../components/SearchSelect";
import booksAPI from "../../../../api/booksAPI";

export default function Tab3({ formData, setFormData }) {
    let { authToken } = useContext(AuthContext);

    // Products Section
    const [productOptions, setProductOptions] = useState([]);
    const [productInputValue, setProductInputValue] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);

    const [totalAmount, setTotalAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);

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

    // Function to calculate the total amount
    const calculateTotalAmount = () => {
        const totalPrice = parseFloat(price);
        const totalQuantity = parseFloat(quantity);

        if (!isNaN(totalPrice) && !isNaN(totalQuantity)) {
            const calculatedTotal = totalPrice * totalQuantity;
            setTotalAmount(calculatedTotal.toFixed(2)); // You can format it as needed
        } else {
            setTotalAmount("");
        }
    };

    const handleProductInputChange = (value) => {
        setProductInputValue(value);
    };

    const handleProductChange = (selectedOption) => {
        // console.log(`Option selected:`, selectedOption);
        setSelectedProduct(products[selectedOption.index]);
        setPrice(products[selectedOption.index].price);
        setTotalAmount(products[selectedOption.index].price);
        // console.log(contacts[selectedOption.index]);
        // console.log(selectedContact);
        setFormData({
            ...formData,
            book_id: parseInt(products[selectedOption.index].id),
            price: parseFloat(products[selectedOption.index].price),
            quantity: parseInt(quantity),
            total_amount: parseFloat(products[selectedOption.index].price),
        });
    };

    useEffect(() => {
        const totalPrice = parseFloat(price);
        const totalQuantity = parseFloat(quantity);

        if (!isNaN(totalPrice) && !isNaN(totalQuantity)) {
            const calculatedTotal = totalPrice * totalQuantity;
            setTotalAmount(calculatedTotal.toFixed(2)); // You can format it as needed
            setFormData({
                ...formData,
                price: parseFloat(totalPrice),
                quantity: parseInt(totalQuantity),
                total_amount: parseFloat(calculatedTotal.toFixed(2)),
            });
        } else {
            setTotalAmount("");
        }
    }, [price, quantity]);

    const handlePriceChange = (e) => {
        // console.log(e.target.value);
        setPrice(e.target.value);
        // setTotalAmount(e.target.value * quantity);
        // calculateTotalAmount();
    };

    const handleQuantityChange = (e) => {
        // console.log(e.target.value);
        setQuantity(e.target.value);
        // setTotalAmount(e.target.value * price);
        // calculateTotalAmount();
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
                        <Form.Label>Product Name</Form.Label>
                        <SearchSelect
                            options={productOptions}
                            onChange={handleProductChange}
                            onInputChange={handleProductInputChange}
                        />
                    </div>

                    {selectedProduct.price ? (
                        <>
                            <div className="col-12 d-flex justify-content-between">
                                <div className="col-5">
                                    <Form.Group>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            onChange={handlePriceChange}
                                            value={price}
                                        ></Form.Control>
                                    </Form.Group>
                                </div>
                                <div className="col-5">
                                    <Form.Group>
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                            type="number"
                                            onChange={handleQuantityChange}
                                            value={quantity}
                                        ></Form.Control>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="col-12">
                                <Form.Group>
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={totalAmount}
                                        readOnly
                                    ></Form.Control>
                                </Form.Group>
                            </div>
                        </>
                    ) : null}
                </div>
            </Card.Body>
        </Card>
    );
}
