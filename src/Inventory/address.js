import React, { useEffect, useState } from 'react'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import { PiArrowSquareLeftFill } from "react-icons/pi";

const MyAddress = ({ handle_Changes, handleMyAddress, handleAmends, handleUserLogged }) => {
    let [title, setTitle] = useState('')
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [buildname, setBuildName] = useState('')
    let [buildNum, setBuildNum] = useState('')
    let [flatNum, setFlatNum] = useState('')
    let [street, setStreet] = useState('')
    let [townStreet, setTownStreet] = useState('')
    let [county, setCounty] = useState('')
    let [addressNick, setAddressNick] = useState('')
    let [delInstruct, setDeliveryInstruction] = useState('')
    let [inputErrStyle, setIES] = useState({})
    let myAddress = useSelector(state => state.address)
    let [showAddress, setShowAdd] = useState(false)
    let [id, setId] = useState('')
    let style = {
        errorStyle: { border: '2px solid red' },
        save: { fontWeight: '500', backgroundColor: 'rgb(156, 104, 205)', color: 'white', width: '70%', borderRadius: '2px', border: 'none' },
        cancel: { color: 'white', backgroundColor: 'gray', width: '70%', border: 'none', fontWeight: 'bold', borderRadius: '2px' },
        address: { fontWeight: '500', backgroundColor: 'rgb(156, 104, 205)', color: 'white', borderRadius: '2px', border: 'none' }

    }
    const navigate = useNavigate('')
    let userLogged = useSelector(state => state.userLoggedIn)


    useEffect(() => {
        if (!myAddress.length) {
            handleMyAddress()
        }

        if (!userLogged) {
            navigate('/signup')
        }
    }, [userLogged, myAddress]);


    const handleChanges = (type, addressId) => {
        if (type === 'add', firstName && lastName && buildNum || buildname && flatNum && street && townStreet && county && addressNick) {
            handle_Changes({ any: 'address', title, firstName, lastName, buildNum, buildname, flatNum, street, townStreet, county, addressNick, delInstruct, id })
            return setShowAdd(false)
        }

        if (type === 'cancel') {
            setShowAdd(false)
            return handleAmends(type)
        }

        if (type === 'edit') {
            setShowAdd(true)
            setId(addressId)
            return handleAmends(type, addressId)
        }

        if (type === 'delete') {
            return handleAmends(type, addressId)
        }

        else {
            setIES({ ...inputErrStyle, errorStyle: style.errorStyle })
            setTimeout(() => { setIES({}) }, 2000)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('myAccessToken')
        handleUserLogged()
        navigate('/')
    }

    return (<Container fluid className='display pb-5'>
        <Row className='d-flex justify-content-center align-items-center m-0 navbar '>
            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-end text-white px-4'>

                {userLogged && (
                    <button className='border-0 bg-transparent d-flex justify-content-end align-items-center mx-1' onClick={() => navigate("/useraccount")}>
                        <BiUserCircle style={{ color: 'black' }} />
                        <span style={{ fontWeight: 'bold' }} className='text-black navaccount m-1'>My account</span>
                    </button>
                )}

                <button
                    className='border-0 bg-transparent navaccount text-black d-flex justify-content-center align-items-center me-2 mx-1'
                    onClick={userLogged ? () => handleLogout() : () => navigate("/signIn")}
                    style={{ fontWeight: 'bold' }}
                >
                    {userLogged ? 'Logout' : 'Login/register'}
                </button>
            </Col>

            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-start text-white px-4'>
                <button className='border-0 bg-transparent' onClick={() => navigate('/')}>
                    <h2 style={{ color: 'blueviolet' }}>Express</h2>
                </button>
            </Col>
        </Row>

        <Row className='d-flex justify-content-start align-items-center'>
            <Col className='p-0 mx-3 my-1' lg={2} md={2} sm={2} xs={2}>
                <button onClick={() => navigate('/useraccount')} className='p-0 border-0 my-1 mx-0 me-0 bg-transparent' style={{ fontSize: '1.3em' }}><PiArrowSquareLeftFill className='my-0 mx-1 me-0 p-0' /><span className='backBtn'>My Account</span></button>
            </Col>
        </Row>

        < Row className='d-flex justify-content-center'>
            <Col className='text-center'>
                <span className='my-2 d-block personal_Address'>My Address</span>
                <span className='my-2 d-block'>{!myAddress ? 'do not have any saved addresses.' : "Here's where you can edit, add or delete your delivery and billing addresses"}
                </span>
                <div><button className='my-2 px-5 pe-5' style={style.address} onClick={() => setShowAdd(true)}>Add a new address</button></div>
            </Col>
        </Row>


        {showAddress ? <>
            <Row className='d-flex justify-content-center pt-0'>
                <Col className='text-center' lg={6} md={6} sm={12} xs={12}>
                    <span className='personal_Address' >Add an address</span>
                    <p style={{ fontSize: '.8em' }}>If you need to change an address for an order you've already placed, go to <Link className='link' to={'/allorders'}>My orders</Link>.</p>
                </Col>
            </Row>

            <Row className='d-flex justify-content-center pt-0 bg-white'>
                <Col className='d-flex justify-content-center py-3 mb-5' lg={10} md={10} sm={12} xs={12}>
                    <Col lg={4} md={4} sm={12} xs={12}>
                        <div className='my-2'>
                            <label className='d-block my-2 mx-1 dlabel' htmlFor="title">Title</label>

                            <select style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onChange={(event) => setTitle(event.target.value)} name="title" id="title" className='personalInput w-50'>
                                <option value="">Select</option>
                                <option value="Mr">Mx</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Mr">Mr</option>
                                <option value="Miss">Miss</option>
                                <option value="Ms">Ms</option>
                                <option value="Capt">Capt</option>
                                <option value="Sir">Sir</option>
                            </select>
                        </div>

                        <div className='my-2'>
                            <label className='d-block dlabel my-2 mx-1' htmlFor='firstName'>First Name</label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setFirstName(event.target.value)} className='personalInput w-100' id='firstName' />
                        </div>
                        <div className='my-2'>
                            <label className='d-block dlabel my-2 mx-1' htmlFor='lastName'>Last Name</label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setLastName(event.target.value)} className='personalInput w-100' id='lastName' />
                        </div>
                        <div className='my-2'>
                            <label className='d-block dlabel my-2 mx-1' htmlFor='buildName'>Building Name</label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setBuildName(event.target.value)} className='personalInput w-100' id='buildName' />
                        </div>
                        <div className='my-2'>
                            <label className='d-block dlabel my-2 mx-1' htmlFor='buildNumber'>Or building number</label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setBuildNum(event.target.value)} className='personalInput w-100' id='buildNumber' />
                        </div>
                        <div className='my-2'>
                            <label className='d-block dlabel my-2 mx-1' htmlFor='flatNumber'>Flat number <span style={{ fontWeight: 'lighter' }}>(if relevant)</span></label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setFlatNum(event.target.value)} className='personalInput w-100' id='flatNumber' />
                        </div>
                        <div className='my-2'>
                            <label className='d-block dlabel my-2 mx-1' htmlFor='street'>Street</label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setStreet(event.target.value)} className='personalInput w-100' id='street' />
                        </div>
                        <div className='my-2'>
                            <label className='d-block dlabel my-2 mx-1' htmlFor='townStreet'>Town or Street</label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setTownStreet(event.target.value)} className='personalInput w-100' id='townStreet' />
                        </div>
                        <div className='my-2'>
                            <label className='d-block dlabel my-2 mx-1' htmlFor='county'>County <span style={{ fontWeight: 'lighter' }}>(optional)</span></label>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setCounty(event.target.value)} className='personalInput w-100' id='county' />
                        </div>
                        <div className='my-2'>
                            <label className='d-block dlabel my-2 mx-1' htmlFor='addressNick'>Address nickname</label>
                            <p style={{ fontSize: '.8em' }}>Give this address a nickname - it'll make it easier to pick out when you have more than one.</p>
                            <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setAddressNick(event.target.value)} className='personalInput w-100' id='addressNick' />
                        </div>
                        <div className='my-2'>
                            <label className='d-block dlabel my-2 mx-1' htmlFor='delInstruct'>Delivery instructions <span style={{ fontWeight: 'lighter' }}>(optional) </span></label>
                            <p style={{ fontSize: '.8em' }}>Enter useful information about your delivery address to help your delivery driver get your order to the right place. E.g. Use side door</p>
                            <textarea onInput={(event) => setDeliveryInstruction(event.target.value)} id='delInstruct' style={{ width: '100%', height: '6em', borderRadius: '2px' }}></textarea>
                        </div>

                        <div className='my-3 text-center'>
                            <button className='py-1' style={style.save} onClick={() => handleChanges('add')}>Save</button>
                        </div>

                        <div className='my-3 text-center'>
                            <button className='py-1' style={style.cancel} onClick={() => handleChanges('cancel')}>Cancel</button>
                        </div>
                    </Col>
                </Col>
            </Row>
        </>
            : null}

        {!showAddress &&
            <Row className='d-flex justify-content-center'>
                {Array.isArray(myAddress) &&
                    myAddress.map((myaddy, index) =>
                        <Col key={index} lg={4} md={8} sm={12} xs={12} className='bg-white p-3 m-1'>
                            <div style={{ fontSize: 'larger', fontWeight: '900' }}>flat {myaddy.flatNum}, {myaddy.street} </div>
                            <div>{myaddy.title}  {myaddy.firstName}  {myaddy.lastName} </div>
                            <div>flat {myaddy.flatNum}</div>
                            <div>{myaddy.buildname} {myaddy.buildNum}</div>
                            <div>{myaddy.street}</div>
                            <div>{myaddy.townStreet} </div>
                            <div>{myaddy.county} </div>
                            <div> {myaddy.addressNick} </div>
                            <div> {myaddy.delInstruct} </div>
                            <div className='d-flex justify-content-between align-items-baseline'>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <button className='py-0 my-2 border-0 bg-transparent addressButton d-flex justify-content-between align-items-center'
                                        onClick={() => handleChanges('edit', myaddy._id)}>
                                        <GrEdit className='pe-1' style={{ fontSize: '1.7em' }} />
                                        <span className='px-1'>Edit</span>
                                    </button >
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}><button className='py-0 m-1 border-0 bg-transparent addressButton d-flex justify-content-between align-items-center'
                                    onClick={() => handleChanges('delete', myaddy._id)}>
                                    <RiDeleteBin6Line className='pe-1' style={{ fontSize: '1.7em' }} />
                                    <span className='px-1'>Delete</span></button>
                                </Col>
                            </div>
                        </Col >)}
            </Row >
        }
    </Container >)
}
export default MyAddress