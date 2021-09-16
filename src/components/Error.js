import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

class Error extends React.Component {
  render() {
    const DOG_PIC_URL = 
      'https://www.pinclipart.com/picdir/big/388-3880683_corgi-clipart-sad-dog-crying-sad-dog-cartoon.png'
    return (
      <Grid textAlign='center' style={{ height: '87vh', marginTop: '50px' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header
            as='h1'
            color='teal'
            textAlign='center'
          >
            Uh Oh! Page Not Found.
          </Header>
          <img className='img-dog' src={DOG_PIC_URL} alt='Sad Dog Clipart'/>
          <Header as='h3' color='teal' textAlign='center'>
            We can't seem to find the page you're looking for.<br/>
            Try accessing a different page.
          </Header>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Error