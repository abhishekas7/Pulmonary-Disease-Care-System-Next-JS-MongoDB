import Accordion from 'react-bootstrap/Accordion';

function Accolite({header,body}) {
  return (
    <Accordion>

      <Accordion.Item eventKey="1">
        <Accordion.Header>{header}</Accordion.Header>
        <Accordion.Body>
   {body}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Accolite;