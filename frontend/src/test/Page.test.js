import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {Account, Menu, Store, ShoppingCart, Home} from "../pages/bundle";
import MenuList from '../components/MenuList';
import configureMockStore  from "redux-mock-store";
import ShoppingCartList from "../components/ShoppingCartList";
import { BrowserRouter as Router } from 'react-router-dom';

Enzyme.configure({adapter: new Adapter()});
const mockStore = configureMockStore();
const drink1 =  {
    collection:'BROWN',
    name:'first drink brown',
    price: 12,
    id:1
}
const drink2 = {
    collection:'LULU',
    name:'second drink brown',
    price: 12,
    id:2
}
describe("Account page", () => {
    test("renders", () => {
        const wrapper = shallow(<Account/>);
        expect(wrapper.exists()).toBe(true)
    });


    test("click left side bar is echoed", () => {
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

describe("MenuList", () => {
    //const mockStore = configureMockStore();
    let wrapper, store;
    function prepareForTestWhenIsLoaded(){
        const initialState = {
            drinks: {
                items: [ drink1, drink2 ]
            },
            isLoading: false
        };
        store = mockStore(initialState);
        // Shallow render the container passing in the mock store
        wrapper = mount(
            <MenuList store={store} />
        );
    }
    function prepareForTestWhenIsNotLoaded(){
        const initialState = {
            drinks: {
                items: [ drink1, drink2 ],
                loading: true
            },
        };
        store = mockStore(initialState);
        wrapper = mount(
            <MenuList store={store}/>
        );
    }

    it('should show drink props', () => {
        prepareForTestWhenIsLoaded();
        expect(wrapper.find("MenuList").props().drinks.length).toBe(2);
    });

    it('should add drink to shopping cart for brown drinks', () => {
        prepareForTestWhenIsLoaded();
        wrapper.find(".addIcon").first().simulate("click")
        const actions = store.getActions();
        expect(actions[1].type).toBe('ADD_TO_SHOPPING_CART')
    });

    it('should add drink to shopping cart for lulu drinks', () => {
        prepareForTestWhenIsLoaded();
        wrapper.find(".addIcon").last().simulate("click");
        const actions = store.getActions();
        expect(actions[1].type).toBe('ADD_TO_SHOPPING_CART');
    });

    it('should not show page when not loading elements', () => {
        prepareForTestWhenIsNotLoaded();
        expect(wrapper.find(".spinner-border").exists()).toBe(true)
    });
});


describe("ShoppingCartList", () => {
    let wrapper, store;
    function prepareForTestWhenCardNotNull(){
        const initialState = {
            shoppingCart: {
                items: [ drink1, drink2 ],
                total:24
            }
        };
        store = mockStore(initialState);
        // Shallow render the container passing in the mock store
        wrapper = mount (
            <Router>
                <ShoppingCartList store={store} />
            </Router>
        );
    }

    function prepareForTestWhenCardIsNull(){
        const initialState = {
            shoppingCart: {
                items: [],
                total: 0
            }
        };
        store = mockStore(initialState);
        // Shallow render the container passing in the mock store
        wrapper = mount (
            <Router>
                <ShoppingCartList store={store} />
            </Router>
        );
    }

    it('should show products props', () => {
        prepareForTestWhenCardNotNull();
        expect(wrapper.find("ShoppingCartList").props().products.length).toBe(2);
    });

    it('should show productItems', () => {
        prepareForTestWhenCardNotNull();
        expect(wrapper.find('Product')).toBeDefined();
        expect(wrapper.find('Product').length).toBe(2);
    });

    it('should checkout account', () => {
        prepareForTestWhenCardNotNull();
        wrapper.find(".btn-success").simulate("click")
        const actions = store.getActions();
        expect(actions[0].type).toBe('ADD_ORDER');
        expect(actions[1].type).toBe('CLEAN_CART');
    });

    it('should handle change number for products ', () => {
        prepareForTestWhenCardNotNull();
        const event = {
            preventDefault() {},
            target: { value: 2 }
        };
        wrapper.find("Product").first().setState({quantity : 1});
        wrapper.find("input").first().simulate('change', event);
        const actions = store.getActions();
        expect(actions[0].type).toBe('CHANGE_QUANTITY');
    });

    it('should handle key down event for products ', () => {
        prepareForTestWhenCardNotNull();
        let isKeyDown = false;
        const event = {
            preventDefault() {isKeyDown = true},
            keyCode: 2
        };
        wrapper.find("input").first().simulate('keyDown', event);
        const actions = store.getActions();
        expect(isKeyDown).toBe(true);
    });

    it('should remove product from card ', () => {
        prepareForTestWhenCardNotNull();
        const event = {
            preventDefault() {}
        };
        wrapper.find("Product").first().find("button").simulate('click', event);
        const actions = store.getActions();
        expect(actions[0].type).toBe('REMOVE_FROM_CART');
    });

    it('should show menu when card is null', () => {
        prepareForTestWhenCardIsNull();
        expect(wrapper.find("h3").first().props().children).toBe("Your cart is currently empty")
    });




});
