import 'isomorphic-fetch';
import React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { initClient } from './initClient';
import { initStore } from './initStore';

export default (Component) => (
  class extends React.Component {
    static async getInitialProps(ctx) {
      const headers = ctx.req ? ctx.req.headers : {};
      ctx.isServer = true;
      const client = initClient(headers);
      const store = initStore(client, client.initialState);
      ctx.store = store;
      ctx.client = client;

      store.dispatch({
        type: 'ADD_STORE',
        props: ctx.query,
      });

      const props = {
        url: { ...ctx.query, pathname: ctx.pathname },
        ...await (Component.getInitialProps ? Component.getInitialProps(ctx) : {}),
      };

      if (!process.browser) {
        const app = (
          <ApolloProvider client={client} store={store}>
            <Component {...props} />
          </ApolloProvider>
        );
        await getDataFromTree(app);
      }

      const state = store.getState();

      return {
        initialState: {
          ...state,
          apollo: {
            data: client.getInitialState().data,
          },
        },
        headers,
        ...props,
      };
    }

    constructor(props) {
      super(props);
      this.client = initClient(this.props.headers, this.props.initialState);
      this.store = initStore(this.client, this.props.initialState);
    }

    render() {
      return (
        <ApolloProvider client={this.client} store={this.store}>
          <Component {...this.props} />
        </ApolloProvider>
      );
    }
  }
);
