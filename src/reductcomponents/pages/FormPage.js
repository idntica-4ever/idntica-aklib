import Page from '../../components/AdminView/Page';
import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';

const FormPage = () => {
  return (
    <Page title="Add Book" breadcrumbs={[{ name: 'New Book', active: true }]}>
      <Row>
        <Col xl={12} lg={12} md={12}>
          <Card>
            <CardHeader>Book Detains</CardHeader>
            <CardBody>
              <Form>
                
                <FormGroup>
                  <Label for="bookTitle">Book Title</Label>
                  <Input
                    type="text"
                    name="booktitle"
                    placeholder="Book Title"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="bookAuthor">Author</Label>
                  <Input
                    type="text"
                    name="AuthorFN"
                    placeholder="First Name"
                  />
                  <Input
                    type="text"
                    name="AuthorSN"
                    placeholder="Second Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="clsNo">Classification</Label>
                  <Input
                    type="text"
                    name="cls"
                    id="clsId"
                    placeholder="Classification"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="scope">Scope</Label>
                  <Input type="select" name="select">
                    <option>Circulation</option>
                    <option>Reference</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="yop">Datetime</Label>
                  <Input
                    type="number"
                    type='number'
                      min={1000}
                      max={9999}
                    placeholder="Year of Publication"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input
                    type="number"
                    name="price"
                    
                    placeholder="Price"
                  />
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
                  </Col>
                </FormGroup>



              </Form>
            </CardBody>
          </Card>
        </Col>

               
           
      </Row>
    </Page>
  );
};

export default FormPage;
