import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Grid, Header } from 'semantic-ui-react'
import 'react-tabs/style/react-tabs.css';
import { connect } from 'react-redux'
import PollPreview from './PollPreview'

class Dashboard extends React.Component {
  render() {
    const { answeredQuestions, unansweredQuestions } = this.props

    return (
      <div className='container center'>
        <Grid textAlign='center' style={{ height: '70px', marginTop: '20px' }}>
          <Grid.Column style={{ maxWidth: 1000 }}>
            <Header as='h2' color='teal' style={{ marginBottom: '40px' }}>Questions</Header>
            <Tabs>
              <TabList>
                <Tab style={{ fontSize: '16px' }}>Unanswered</Tab>
                <Tab style={{ fontSize: '16px' }}>Answered</Tab>
              </TabList>
              <TabPanel>
                {unansweredQuestions.length > 0 ? (unansweredQuestions.map(id => (
                  <li key={id}>
                    <PollPreview id={id} />
                  </li>
                )))
                : 
                <div>
                    <Header as='h4' style={{ marginTop: '40px' }}>No more unanswered questions!</Header>
                  <Header as='h4'>Help contribute by adding new poll questions.</Header>
                </div>
                }
              </TabPanel>
              <TabPanel>
                {answeredQuestions && answeredQuestions.map(id => (
                  <li key={id}>
                    <PollPreview id={id} />
                  </li>
                ))}
              </TabPanel>
            </Tabs>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }) {

  const answeredQuestions = Object.keys(users[authedUser].answers)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return {
    answeredQuestions,
    unansweredQuestions: Object.keys(questions).filter(qid => !answeredQuestions.includes(qid))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  }
}

export default connect(mapStateToProps)(Dashboard)