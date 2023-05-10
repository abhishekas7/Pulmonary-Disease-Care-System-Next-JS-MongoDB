/* eslint-disable no-unused-vars */
import Accordion from 'react-bootstrap/Accordion';

// eslint-disable-next-line react/prop-types
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