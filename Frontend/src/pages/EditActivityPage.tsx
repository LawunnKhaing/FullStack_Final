import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

interface Activity {
  id: number;
  title: string;
  description: string;
  url?: string;
  createdAt: string;
}

const EditActivityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchActivity(id);
    }
  }, [id]);

  const fetchActivity = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/activities/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch activity');
      }
      const activityData = await response.json();
      setActivity(activityData);
      setTitle(activityData.title);
      setDescription(activityData.description);
      setUrl(activityData.url || '');
    } catch (error) {
      console.error('Error fetching activity:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedActivity = {
      title,
      description,
      url,
      createdAt: activity?.createdAt || '',
    };

    try {
      const response = await fetch(`http://localhost:5000/api/activities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedActivity),
      });

      if (!response.ok) {
        throw new Error('Failed to update activity');
      }

      navigate('/activities');
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  if (!activity) return <div>Loading...</div>;

  return (
    <Container className="mt-5">
      <h1>Edit Activity</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="activityTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="activityDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="activityUrl">
            <Form.Label>URL (optional)</Form.Label>
            <Form.Control type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">Update Activity</Button>
      </Form>
    </Container>
  );
};

export default EditActivityPage;
