import React, { useState } from 'react';
import Nav from './Nav';  
import hogsData from '../porkers_data'; 
import { Card, Image, Button, Checkbox, Modal, Header, List } from 'semantic-ui-react'; 

const App = () => {
  const [hogs, setHogs] = useState(hogsData);
  const [showGreased, setShowGreased] = useState(false);
  const [selectedHogIndex, setSelectedHogIndex] = useState(null);  

  const sortHogs = (criteria) => {
    const sortedHogs = [...hogs].sort((a, b) => {
      if (criteria === 'name') {
        return a.name.localeCompare(b.name);
      } else if (criteria === 'weight') {
        return a.weight - b.weight;
      }
      return 0;
    });
    setHogs(sortedHogs);
  };

  const filteredHogs = showGreased
    ? hogs.filter(hog => hog.greased)  
    : hogs;  

  const deleteHog = (index) => {
    const updatedHogs = hogs.filter((_, i) => i !== index);
    setHogs(updatedHogs);
  };

  const toggleHogVisibility = (index) => {
    const updatedHogs = hogs.map((hog, i) => {
      if (i === index) {
        return { ...hog, visible: !hog.visible };
      }
      return hog;
    });
    setHogs(updatedHogs);
  };

  const handleHogClick = (index) => {
    if (selectedHogIndex === index) {
      setSelectedHogIndex(null); 
    } else {
      setSelectedHogIndex(index); 
    }
  };

  return (
    <div className="App">
      <Nav />
      <h1>Hogs Sorting</h1>
      <div>
        <button onClick={() => sortHogs('name')}>Sort by Name</button>
        <button onClick={() => sortHogs('weight')}>Sort by Weight</button>
      </div>
      <div>
        <label>
          <Checkbox
            checked={showGreased}
            onChange={() => setShowGreased(prev => !prev)}
            label="Show Greased Hogs"
          />
        </label>
      </div>

      <div className="ui grid container">
        {filteredHogs.map((hog, index) => (
          <div className="ui eight wide column" key={index}>
            <Card onClick={() => handleHogClick(index)} style={{ cursor: 'pointer' }}>
              <Image src={hog.image} alt={hog.name} />
              <Card.Content>
                <Card.Header>{hog.name}</Card.Header>
                <Card.Meta>{hog.weight} lbs</Card.Meta>
                <Card.Description>
                  {hog.greased ? '(Greased)' : ''}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button onClick={() => toggleHogVisibility(index)}>
                  {hog.visible ? 'Hide' : 'Show'}
                </Button>
                <Button onClick={() => deleteHog(index)} color="red">
                  Delete
                </Button>
              </Card.Content>
            </Card>

            {selectedHogIndex === index && (
              <Modal open={selectedHogIndex === index} onClose={() => setSelectedHogIndex(null)}>
                <Modal.Header>{hog.name} Details</Modal.Header>
                <Modal.Content>
                  <List>
                    <List.Item>
                      <List.Header>Specialty</List.Header>
                      <List.Description>{hog.specialty}</List.Description>
                    </List.Item>
                    <List.Item>
                      <List.Header>Weight</List.Header>
                      <List.Description>{hog.weight} lbs</List.Description>
                    </List.Item>
                    <List.Item>
                      <List.Header>Greased</List.Header>
                      <List.Description>{hog.greased ? 'Yes' : 'No'}</List.Description>
                    </List.Item>
                    <List.Item>
                      <List.Header>Highest Medal Achieved</List.Header>
                      <List.Description>{hog.highestMedal}</List.Description>
                    </List.Item>
                  </List>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => setSelectedHogIndex(null)} color="black">
                    
                  </Button>
                </Modal.Actions>
              </Modal>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
