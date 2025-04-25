import { Formik, Form, Field } from 'formik';
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (query: string) => void;
  initialQuery: string;
}

export default function SearchBar({ onSubmit, initialQuery }: SearchBarProps) {
  return (
    <Formik
      initialValues={{ query: initialQuery || '' }}
      onSubmit={(values, actions) => {
        if (!values.query.trim()) {
          toast.error('Please enter a search query!');
          return;
        }

        onSubmit(values.query);
        actions.resetForm({ values: { query: values.query } });
      }}
    >
      <Form>
        <Field type="text" name="query" />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}
