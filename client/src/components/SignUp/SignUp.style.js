import styled from 'styled-components';

export const FormWrapper = styled.div`
  background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
  border-radius: 1.25rem;
  width: 50%;
  min-width: 250px;
  max-width: 500px;
  margin: 5rem auto;
  padding: 1.5rem;
`;

export const Form = styled.form`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  width: 100%;
`;

export const Input = styled.input`
  display: block;
  width: 90%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const Button = styled.button`
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  margin: 1rem auto;
  display: block;
  font-size: 18px;
`;
