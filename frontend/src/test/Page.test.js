import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {Account} from "../pages/bundle";
import {Menu} from "../pages/bundle";
import {Store} from "../pages/bundle";
import {ShoppingCart} from "../pages/bundle";
import {Home} from "../pages/bundle";
import MenuList from '../components/MenuList';
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";

import {addToShoppingCart} from "../actions/shoppingCart";
import {FETCH_DRINKS} from "../actions/drinks";
import createSagaMiddleware from 'redux-saga';

/*
import {MenuList}
*/
Enzyme.configure({adapter: new Adapter()});

describe("Account page", () => {
    test("renders", () => {
        const wrapper = shallow(<Account/>);
        expect(wrapper.exists()).toBe(true)
    });


    test("click left side bar is echoed", ()=> {
        const wrapper = mount(<Account/>);
        wrapper.find('LeftSideBar').find('TabItem').last().simulate('click');
        expect(wrapper.state().tabSelectedId).toBe(4);
    })
});


describe("Menu page", () => {
    it("renders", () => {
        const wrapper = shallow(<Menu/>);
        expect(wrapper.exists()).toBe(true)
    });

   /* test("should add drink to shopping card", ()=> {
        //const store = createStore()
        const wrapper = shallow(<Provider store={store}>
                                    <MenuList/>
                                </Provider>);
        console.log("!!!!!!!!!!!!!")
        wrapper.setProps({drinks: {collection:'BROWN', id:1}})
        console.log(wrapper.find('MenuList').find('Menuitem'))
        wrapper.find('MenuList').find('Menuitem').find(".addIcon").simulate('click');
        expect(wrapper.find('MenuList').props().addToShoppingCart).toHaveBeenCalled();
    })*/
});

describe("Store page", () => {
    it("renders", () => {
        const wrapper = shallow(<Store/>);
        expect(wrapper.exists()).toBe(true)
    });
});

describe("Home page", () => {
    it("renders", () => {
        const wrapper = shallow(<Home/>);
        expect(wrapper.exists()).toBe(true)
    });
});

describe("ShoppingCart page", () => {
    it("renders", () => {
        const wrapper = shallow(<ShoppingCart/>);
        expect(wrapper.exists()).toBe(true)
    });
});

const mockStore = configureMockStore();

describe("MenuList", () => {
    let wrapper, store;

    beforeEach(() => {
        const initialState = {
            drinks: {
                items: [
                    {
                        collection:'BROWN',
                        name:'first drink brown',
                        price: 12,
                        id:1
                    },
                    {
                        collection:'BROWN',
                        name:'second drink brown',
                        price: 12,
                        id:2
                    }
                ]
            }
        };
        store = mockStore(initialState);
        // Shallow render the container passing in the mock store
        wrapper = shallow(
            <MenuList store={store} />
        );
    });

    it('should show drink props', () => {
        expect(wrapper.props().drinks[0].id).toBe(1);
    });

/*    it('should show menuItems', () => {
        console.log("!!!!!!!")
        console.log(wrapper.find("Menuitem"))
        expect(wrapper.find('Menuitem').length).toBe(2);
        //expect(wrapper.find(Menuitem));
    });*/

/*    it('should add drink to shipping card when button is clicked', () => {
        // test that the component events dispatch the expected actions
        wrapper.simulate('fetchDrinks');
        const actions = store.getActions();
        console.log("!!!!!!!")
        console.log(actions)
        expect(actions).toEqual([ { type: 'FETCH_DRINKS' } ]);
    });*/
});
