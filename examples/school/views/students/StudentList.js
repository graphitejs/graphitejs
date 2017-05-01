import Link from 'next/link';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '../../components/Table';
import StudentActions from './StudentActions';

export default class StudentList extends Component {
  static propTypes = {
    mutate: PropTypes.func,
    data: PropTypes.shape({
      loading: PropTypes.boolean,
      error: PropTypes.object,
    }),
  }

  static defaultProps = {
    loading: true,
    data: {
      students: [],
    },
  }

  constructor() {
    super();
  }

  render() {
    const { data: { loading, error, students }, model } = this.props;

    const actions = {
      name: 'Actions',
      elements: (<StudentActions />),
    };

    const studentTable = !loading && !error ? (
      <Table items= {students} actions={actions} omit={['__typename', 'active']} />
    ) : null;

    return (
      <div>
        <style jsx>{`
          h2 {
            float: left;
          }
          a {
            float: right;
            padding: 30px;
          }
        `}
        </style>
        <div>
          <h2>{model}</h2>
          <Link href="/{model}/create">
            <a>Add {model}</a>
          </Link>
        </div>
        {studentTable}
      </div>
    );
  }
}
