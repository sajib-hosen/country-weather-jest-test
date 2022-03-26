import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import App from "../App";

describe('testing app', ()=>{

    test('search btn in the document', async ()=>{
        render( <App />)
        const searchBtn = screen.getByText(/search/i)
        expect(searchBtn).toBeInTheDocument()
    })

    // matter of fetching data from server
    // test('input field in the document', async ()=>{
    //     const { getByTestId } = render( <App />)
    //     const searchBtn = screen.getByText(/search/i);
    //     const inputEl: any = getByTestId('inputField').querySelector('input');

    //     fireEvent.change(inputEl, { target: { value: 'bangladesh' }});
    //     fireEvent.click(searchBtn)

    //     const countryName = await screen.findByDisplayValue(/bangladesh/i)
    //     expect(countryName).toBeInTheDocument()
    // })

})