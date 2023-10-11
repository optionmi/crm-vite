import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    ListGroup,
    ListGroupItem,
} from "react-bootstrap";
import SearchSelect from "../../../components/SearchSelect";
import booksAPI from "../../../api/booksAPI";

export default function QuoteItems({ formData, setFormData }) {
    let { authToken } = useContext(AuthContext);
    // const [quoteItems, setQuoteItems] = useState(formData.quote_items);

    const [productOptions, setProductOptions] = useState([]);
    const [productInputValue, setProductInputValue] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState([]);

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
        let leadProductsArr = [...formData.quote_items];
        if (leadProductsArr[index]) {
            leadProductsArr[index] = {
                ...leadProductsArr[index],
                // book: { title: selectedOption.label },
            };
            leadProductsArr[index].book_id = selectedOption.value;
            leadProductsArr[index].price = parseFloat(
                products[selectedOption.index].price
            );
            leadProductsArr[index].amount = parseFloat(
                products[selectedOption.index].price
            );
            leadProductsArr[index].total = parseFloat(
                products[selectedOption.index].price
            );
        }
        // setQuoteItems(leadProductsArr);
        setFormData((prevFormData) => {
            return { ...prevFormData, quote_items: leadProductsArr };
        });
        setSelectedProduct(products[selectedOption.index]);
    };

    const handleAddMoreItem = () => {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                quote_items: [
                    ...prevFormData.quote_items,
                    {
                        book_id: "",
                        quantity: 1,
                        price: 0,
                        amount: 0,
                        discount: 0,
                        tax: 0,
                        total: 0,
                    },
                ],
            };
        });
        // setQuoteItems((prevItems) => [
        //     ...prevItems,
        //     {
        //         book_id: "",
        //         quantity: 1,
        //         price: 0,
        //         amount: 0,
        //         discount: 0,
        //         tax: 0,
        //         total: 0,
        //     },
        // ]);
    };

    const handleQuoteItemDataChange = (e, index) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        // const updatedQuoteItems = quoteItems.map((item, i) => {
        const updatedQuoteItems = formData.quote_items.map((item, i) => {
            if (i === index) {
                const quantity = parseFloat(
                    fieldName === "quantity" ? fieldValue : item.quantity
                );
                const price = parseFloat(
                    fieldName === "price" ? fieldValue : item.price
                );
                const tax = parseFloat(
                    fieldName === "tax" ? fieldValue : item.tax
                );
                const discount = parseFloat(
                    fieldName === "discount" ? fieldValue : item.discount
                );

                const amount = quantity * price;
                const total = amount + tax - discount;

                return {
                    ...item,
                    [fieldName]: fieldValue,
                    amount: amount.toFixed(2),
                    total: total.toFixed(2),
                };
            }
            return item;
        });

        // setQuoteItems(updatedQuoteItems);
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                quote_items: updatedQuoteItems,
            };
        });
    };

    useEffect(() => {
        let sub_total = 0;
        let total_discount = 0;
        let total_tax = 0;
        let grand_total = 0;

        // quoteItems.forEach((item) => {
        formData.quote_items.forEach((item) => {
            sub_total += parseFloat(item.amount);
            total_discount += parseFloat(item.discount);
            total_tax += parseFloat(item.tax);
            grand_total +=
                parseFloat(item.amount) +
                parseFloat(item.tax) -
                parseFloat(item.discount);
        });
        grand_total += parseFloat(formData.adjustment);

        setFormData({
            ...formData,
            // quote_items: quoteItems,
            sub_total,
            total_discount,
            total_tax,
            grand_total,
        });
    }, [formData.quote_items]);

    const handleAdjustmentChange = (e) => {
        let grand_total = 0;

        // quoteItems.forEach((item) => {
        formData.quote_items.forEach((item) => {
            grand_total +=
                parseFloat(item.amount) +
                parseFloat(item.tax) -
                parseFloat(item.discount);
        });

        if (!isNaN(e.target.value)) {
            grand_total += parseFloat(e.target.value);
            setFormData({
                ...formData,
                adjustment: e.target.value,
                grand_total,
            });
        }
    };

    const handleRemoveItem = (index) => {
        let quoteItemsArr = [...formData.quote_items];
        let removedItemIdArr = formData.removed_items
            ? [...formData.removed_items]
            : [];
        removedItemIdArr.push(quoteItemsArr[index].id);

        quoteItemsArr.splice(index, 1);
        // setQuoteItems(quoteItemsArr);
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                quote_items: quoteItemsArr,
                removed_items: removedItemIdArr,
            };
        });
    };

    return (
        <div className="d-flex flex-column gap-2">
            <ListGroup>
                {formData.quote_items.map((item, index) => (
                    <ListGroupItem
                        key={index}
                        className="d-flex flex-column gap-2"
                    >
                        <FormGroup className="d-flex flex-column">
                            <div className="d-flex justify-content-between my-2">
                                <FormLabel>Name</FormLabel>
                                {formData.quote_items.length > 1 && (
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleRemoveItem(index)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                            {item.book ? (
                                <SearchSelect
                                    value={{
                                        value: item?.book?.id,
                                        label: item?.book?.title,
                                    }}
                                    options={productOptions}
                                    onChange={(e) =>
                                        handleProductChange(e, index)
                                    }
                                    onInputChange={handleProductInputChange}
                                />
                            ) : (
                                <SearchSelect
                                    options={productOptions}
                                    onChange={(e) =>
                                        handleProductChange(e, index)
                                    }
                                    onInputChange={handleProductInputChange}
                                />
                            )}
                        </FormGroup>
                        <div className="d-flex gap-2">
                            <FormGroup className="d-flex flex-column">
                                <FormLabel>Quantity</FormLabel>
                                <FormControl
                                    type="number"
                                    name="quantity"
                                    value={item.quantity}
                                    min="1"
                                    onChange={(e) =>
                                        handleQuoteItemDataChange(e, index)
                                    }
                                ></FormControl>
                            </FormGroup>
                            <FormGroup className="d-flex flex-column">
                                <FormLabel>Price</FormLabel>
                                <FormControl
                                    type="number"
                                    name="price"
                                    value={item.price}
                                    onChange={(e) =>
                                        handleQuoteItemDataChange(e, index)
                                    }
                                ></FormControl>
                            </FormGroup>
                            <FormGroup className="d-flex flex-column">
                                <FormLabel>Amount</FormLabel>
                                <FormControl
                                    type="number"
                                    name="amount"
                                    value={item.amount}
                                    onChange={(e) =>
                                        handleQuoteItemDataChange(e, index)
                                    }
                                ></FormControl>
                            </FormGroup>
                            <FormGroup className="d-flex flex-column">
                                <FormLabel>Discount</FormLabel>
                                <FormControl
                                    type="number"
                                    name="discount"
                                    value={item.discount}
                                    onChange={(e) =>
                                        handleQuoteItemDataChange(e, index)
                                    }
                                ></FormControl>
                            </FormGroup>
                            <FormGroup className="d-flex flex-column">
                                <FormLabel>Tax</FormLabel>
                                <FormControl
                                    type="number"
                                    name="tax"
                                    value={item.tax}
                                    onChange={(e) =>
                                        handleQuoteItemDataChange(e, index)
                                    }
                                ></FormControl>
                            </FormGroup>
                            <FormGroup className="d-flex flex-column">
                                <FormLabel>Total</FormLabel>
                                <FormControl
                                    type="number"
                                    name="total"
                                    value={item.total}
                                    onChange={(e) =>
                                        handleQuoteItemDataChange(e, index)
                                    }
                                ></FormControl>
                            </FormGroup>
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>
            <div>
                <Button
                    variant="success"
                    size="sm"
                    className="my-2"
                    onClick={handleAddMoreItem}
                >
                    Add More
                </Button>
            </div>

            <div className="d-flex justify-content-center col-12 my-4">
                <div className="d-flex flex-column gap-2 col-8">
                    <FormGroup className="col-10 d-flex gap-4">
                        <FormLabel className="col-6 fw-bold">
                            Sub Total (₹)
                        </FormLabel>
                        <FormControl
                            type="number"
                            value={formData.sub_total}
                            readOnly
                        ></FormControl>
                    </FormGroup>

                    <FormGroup className="col-10 d-flex gap-4">
                        <FormLabel className="col-6 fw-bold">
                            Discount (₹)
                        </FormLabel>
                        <FormControl
                            type="number"
                            value={formData.total_discount}
                            readOnly
                        ></FormControl>
                    </FormGroup>

                    <FormGroup className="col-10 d-flex gap-4">
                        <FormLabel className="col-6 fw-bold">Tax (₹)</FormLabel>
                        <FormControl
                            type="number"
                            value={formData.total_tax}
                            readOnly
                        ></FormControl>
                    </FormGroup>

                    <FormGroup className="col-10 d-flex gap-4">
                        <FormLabel className="col-6 fw-bold">
                            Adjustment (₹)
                        </FormLabel>
                        <FormControl
                            type="number"
                            value={formData.adjustment}
                            onChange={handleAdjustmentChange}
                        ></FormControl>
                    </FormGroup>

                    <FormGroup className="col-10 d-flex gap-4">
                        <FormLabel className="col-6 fw-bold">
                            Grand Total (₹)
                        </FormLabel>
                        <FormControl
                            type="number"
                            value={formData.grand_total}
                            readOnly
                        ></FormControl>
                    </FormGroup>
                </div>
            </div>
        </div>
    );
}
