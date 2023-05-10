
// eslint-disable-next-line no-unused-vars
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

function MedicalRecord() {
  return (
    <div>

      <VerticalTimeline>
        <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#bee2ff', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  #bee2ff' }}
    date="2011 - present"
    iconStyle={{ background: '#bee2ff', color: '#fff' }}

  >
          <h6 className="vertical-timeline-element-title">Creative Director</h6>
          <h5 className="vertical-timeline-element-subtitle">Miami, FL</h5>
          <p>
            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
          </p>
        </VerticalTimelineElement>
  
        <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: '#bee2ff', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  #bee2ff' }}
    date="2011 - present"
    iconStyle={{ background: '#bee2ff', color: '#fff' }}

  >
          <h6 className="vertical-timeline-element-title">Creative Director</h6>
          <h5 className="vertical-timeline-element-subtitle">Miami, FL</h5>
          <p>
            Creative Direction, User Experience, Visual Design, Project Management, Team Leading
          </p>
        </VerticalTimelineElement>



 

      </VerticalTimeline>
    </div>
  )
}

export default MedicalRecord