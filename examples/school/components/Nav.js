import Link from 'next/link';
import { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

export default class List extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.any.isRequired,
      href: PropTypes.any.isRequired,
    })),
  }

  static defaultProps = {
    items: [],
  }

  render() {
    const { items } = this.props;

    return (
      <nav>
        <style jsx>{`
          nav {
            float: left;
            width: 200px;
          }
        `}
        </style>
        <ul>
          {items.map((item, key) => {
            return <li key= { key }>
                      <Link prefetch as={item.name} href= {{ pathname: item.href }}><a>{item.name}</a></Link>
                   </li>;
          })}
        </ul>
      </nav>
    );
  }
}
