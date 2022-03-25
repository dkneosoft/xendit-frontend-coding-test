import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'reactstrap';
import {
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Col, Form, FormGroup, Label, Input, FormText,
    Container,
    Row
} from 'reactstrap';

const List = (props) => {

    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);
    const [loading, setLoading] = useState(false)

    const [submitErrorMessage, setErrorMessage] = useState('')

    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
        setErrorMessage('')
    }

    const [viewModal, setViewModal] = useState(false);
    const toggleViewModal = () => {
        setViewModal(!viewModal);
        setErrorMessage('')
    }

    const [editModal, setEditModal] = useState(false);
    const toggleEditModal = () => {
        setEditModal(!editModal);
        setErrorMessage('')
    }

    let [viewUniversity, setViewUniversity] = useState({})
    let [editUnviersity, setEditUniversity] = useState({})
    let [unviersities, setUniversity] = useState([])

    let [universtiyDetail, setUniverstiyDetail] = useState({
        name: '',
        country: '',
        alpha_two_code: 'US',
        domains: '',
        webpages: ''
    });

    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        universtiyDetail[name] = value;
        setUniverstiyDetail(universtiyDetail);
    }

    let [universtiyEditDetail, setUniverstiyEditDetail] = useState({
        name: '',
        country: '',
        alpha_two_code: 'US',
        domains: '',
        webpages: ''
    });

    let handleEditChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        universtiyEditDetail[name] = value;

        let newUniversityObject = Object.assign({}, editUnviersity, {
            [e.nativeEvent.target.name]: e.target.value
        })

        setUniverstiyEditDetail(universtiyEditDetail);
        setEditUniversity(newUniversityObject)
    }


    const submitForm = (e) => {
        e.preventDefault();

        if (universtiyDetail.name == '' || universtiyDetail.country == '') {
            setErrorMessage('Please provide universtiy information')
            return

        }

        var domains = []
        domains.push(universtiyDetail.domains)

        var webpages = []
        webpages.push(universtiyDetail.webpages)


        let data = {
            "name": universtiyDetail.name,
            "country": universtiyDetail.country,
            "alpha_two_code": universtiyDetail.alpha_two_code,
            "domains": domains,
            "web_pages": webpages
        }

        fetch('https://university-api.tranityproject.com/api/v1/university', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result", result)
                    universityList()
                    setErrorMessage('')
                    toggleModal()
                },
                (error) => {
                    console.log(error)
                }
            )

    }

    const openEditForm = (e, id) => {
        e.preventDefault();

        fetch('https://university-api.tranityproject.com/api/v1/university/' + id, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result", result)
                    setEditUniversity(result)
                    toggleEditModal()
                },
                (error) => {
                    console.log(error)
                }
            )

    }

    const submitEditForm = (e, id) => {
        e.preventDefault();

        var domains = []
        domains.push(universtiyEditDetail.domains !== '' ? universtiyEditDetail.domains : editUnviersity.domains)

        var webpages = []
        webpages.push(universtiyEditDetail.webpages !== '' ? universtiyEditDetail.webpages : editUnviersity.webpages)

        let data = {
            "name": universtiyEditDetail.name !== '' ? universtiyEditDetail.name : editUnviersity.name,
            "country": universtiyEditDetail.country !== '' ? universtiyEditDetail.country : editUnviersity.country,
            "alpha_two_code": editUnviersity.alpha_two_code,
            "domains": domains,
            "web_pages": webpages
        }

        fetch('https://university-api.tranityproject.com/api/v1/university/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result", result)
                    universityList()
                    setErrorMessage('')
                    toggleEditModal()
                },
                (error) => {
                    console.log(error)
                }
            )

    }


    const deleteUniversity = (e, id) => {
        e.preventDefault();

        fetch('https://university-api.tranityproject.com/api/v1/university/' + id, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result", result)
                    universityList()
                },
                (error) => {
                    console.log(error)
                }
            )

    }

    const getUnviersity = (e, id) => {
        e.preventDefault();

        fetch('https://university-api.tranityproject.com/api/v1/university/' + id, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result", result)
                    setViewUniversity(result)
                    toggleViewModal()
                },
                (error) => {
                    console.log(error)
                }
            )

    }

    const universityList = useCallback(() => {
        setLoading(true)

        fetch('https://university-api.tranityproject.com/api/v1/university?page=1', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("result", result)
                    setUniversity(result.data)
                    setLoading(false)
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    useEffect(() => {
        universityList()
    }, [universityList]);

    return (
        <div>
            <Button
                style={{ float: 'right'}}
                // className="float-right"
                color="primary"
                onClick={toggleModal}
            >
                {/* <FontAwesomeIcon icon={['fas', 'square']} /> */}
                Add
            </Button>

            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Create</ModalHeader>
                <ModalBody>
                    <Form className="form" onSubmit={(e) => submitForm(e)}>
                        <Col>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="input"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="country">Country</Label>
                                <Input
                                    type="input"
                                    name="country"
                                    id="country"
                                    placeholder="Country"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="domains">Domains</Label>
                                <Input
                                    type="input"
                                    name="domains"
                                    id="domains"
                                    placeholder="Domains"
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="webpages">Web Pages</Label>
                                <Input
                                    type="input"
                                    name="webpages"
                                    id="webpages"
                                    placeholder="Webpages"
                                    onChange={handleChange}
                                />
                            </FormGroup>

                            <div style={{ float: "right" }}>
                                <Button color="primary">Create</Button>
                                <Button color="primary" onClick={toggleModal}>Cancel</Button>
                            </div>
                        </Col>
                    </Form>
                    {submitErrorMessage}
                </ModalBody>
            </Modal>

            <Modal isOpen={editModal} toggle={toggleEditModal}>
                <ModalHeader toggle={toggleEditModal}>Edit</ModalHeader>
                <ModalBody>
                    <Form className="form" onSubmit={(e) => submitEditForm(e, editUnviersity.id)}>
                        <Col>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="input"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    onChange={handleEditChange}
                                    value={("name" in editUnviersity) ? editUnviersity.name : universtiyEditDetail.name}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="country">Country</Label>
                                <Input
                                    type="input"
                                    name="country"
                                    id="country"
                                    placeholder="Country"
                                    onChange={handleEditChange}
                                    value={("country" in editUnviersity) ? editUnviersity.country : ''}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="domains">Domains</Label>
                                <Input
                                    type="input"
                                    name="domains"
                                    id="domains"
                                    placeholder="Domains"
                                    onChange={handleEditChange}
                                    value={("domains" in editUnviersity) ? editUnviersity.domains[0] : ''}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="webpages">Web Pages</Label>
                                <Input
                                    type="input"
                                    name="webpages"
                                    id="webpages"
                                    placeholder="Webpages"
                                    onChange={handleEditChange}
                                    value={("web_pages" in editUnviersity) ? editUnviersity.web_pages[0] : ''}
                                />
                            </FormGroup>

                            <div style={{ float: "right" }}>
                                <Button color="primary">Save Changes</Button>
                                <Button color="primary" onClick={toggleEditModal}>Cancel</Button>
                            </div>
                        </Col>
                    </Form>
                    {submitErrorMessage}
                </ModalBody>
            </Modal>

            <Modal isOpen={viewModal} toggle={toggleViewModal}>
                <ModalHeader toggle={toggleViewModal}>Detail information</ModalHeader>
                <ModalBody>

                    <Container>
                        <Row>
                            <Col xs={4} md={4}>
                                ID
                            </Col>
                            <Col xs={8} md={8}>
                                {viewUniversity.id}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={4}>
                                Name
                            </Col>
                            <Col xs={8} md={8}>
                                {viewUniversity.name}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={4}>
                                Country
                            </Col>
                            <Col xs={8} md={8}>
                                {viewUniversity.country}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={4}>
                                Web Pages
                            </Col>
                            <Col xs={8} md={8}>
                                {("web_pages" in viewUniversity) ? viewUniversity.web_pages[0] : ''}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={4}>
                                Domain
                            </Col>
                            <Col xs={8} md={8}>
                                {("domains" in viewUniversity) ? viewUniversity.domains[0] : ''}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={4}>
                                Created
                            </Col>
                            <Col xs={8} md={8}>
                                {viewUniversity.created_at}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={4}>
                                Updated
                            </Col>
                            <Col xs={8} md={8}>
                                {viewUniversity.updated_at}
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
            </Modal>

            <Table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" id="universityname" name="universityname" />
                            &nbsp;  UNIVERSITY NAME
                        </th>
                        <th>COUNTRY</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {
                        unviersities.length ?
                            unviersities.map((university, key) => (
                                <tr key={key}>
                                    {/* <td scope="row">{key + 1}</td> */}
                                    <td>
                                        <Col>
                                            <input type="checkbox" id="universityname" name="universityname" />
                                            &nbsp; {university.name}
                                        </Col>
                                        <Col>{university.domains[0]}</Col>
                                    </td>
                                    <td>{university.country}</td>
                                    <td>
                                        {
                                            <>
                                                <Button
                                                    onClick={(e) => getUnviersity(e, university.id, "View")}
                                                    color="primary"
                                                >
                                                    View </Button>
                                                <Button
                                                    onClick={(e) => openEditForm(e, university.id, "Edit")}
                                                    color="warning"
                                                >
                                                    Edit</Button>
                                                <Button
                                                    onClick={(e) => deleteUniversity(e, university.id, "Delete")}
                                                >
                                                    Delete</Button>
                                            </>
                                        }
                                        {/* <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                                            <DropdownToggle caret>
                                                Action
                                        </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>Mark Complete</DropdownItem>
                                                <DropdownItem divider />
                                                <DropdownItem>Mark Start</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown> */}
                                    </td>

                                </tr>
                            ))
                            :
                            <tr style={{ background: "darkgrey" }}>
                                <td colSpan="7">
                                    No unviersities Availalble !
                                </td>
                            </tr>
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default List;