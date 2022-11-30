import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../service/auth.service";
import fetchService from "../service/fetch.service";
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
	const [menuState, setMenuState] = useState(undefined);
	const [customizedState, setCustomizedState] = useState(undefined);
	const [cart, setCart] = useState([]);
	const [auth, setAuth] = useState(false);

	useEffect(() => {
		fetchMenu();
	}, []);

	return (
		<StateContext.Provider
			value={{
				menuState,
				customizedState,
				cart,
				auth,
				setCart,
				pushToCart,
				dropFromCart,
				shiftCartItemAmount,
			}}>
			{children}
		</StateContext.Provider>
	);

	async function fetchMenu() {
		try {
			const res = await authService.login();
			if (res?.data.success) {
				fetchService.token = res.data.token;
				const dataRes = await fetchService.findAll("menu");
				if (dataRes?.data.success) {
					setCustomizedState(dataRes.data.data.customized);
					setMenuState(dataRes.data.data.menu);
				}
				setAuth(true);
			}
		} catch (err) {
			console.log(err);
		}
	}

	function pushToCart(object) {
		object.custom = makeCheckStr(object);
		const pos = cart.findIndex((itm) => {
			return object.product.productNo === itm.product.productNo && object.custom === itm.custom;
		});
		setCart((pre) => {
			if (pos > -1) {
				let o = JSON.parse(JSON.stringify(pre));
				o[pos].product.quantity += object.product.quantity;
				return o;
			} else {
				return [...pre, object];
			}
		});
		return;
		function makeCheckStr(obj) {
			let str = "";
			const compareItem = (a, b) => (a.item === b.item ? 0 : a.item > b.item ? -1 : 1);
			const compareContent = (a, b) => (a.content === b.content ? 0 : a.content > b.content ? -1 : 1);
			Object.values(obj.customized)
				.sort(compareItem)
				.forEach((itm) => {
					itm.contents.sort(compareContent).forEach((content) => {
						str += itm.item + ":";
						str += content.content;
						str += ",";
					});
				});
			return str;
		}
	}

	function dropFromCart(index) {
		setCart((pre) => [...pre.slice(0, index), ...pre.slice(index + 1)]);
	}

	function shiftCartItemAmount(index, amount) {
		setCart((pre) => {
			let item = JSON.parse(JSON.stringify(pre[index]));
			let value = item.product.quantity + amount;
			if (value > 99) item.product.quantity = 99;
			else if (value < 1) item.product.quantity = 1;
			else item.product.quantity = value;

			return [...pre.slice(0, index), item, ...pre.slice(index + 1)];
		});
	}
};

export const useStateContext = () => useContext(StateContext);
