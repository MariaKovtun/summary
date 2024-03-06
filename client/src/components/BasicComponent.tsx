import Header from './Header'
import Footer from './Footer'
import { useState } from 'react';
import { SearchContext } from '../contexts/SearchContext';

type BasicComponentProps = {
    children: React.ReactNode;
}

const BasicComponent = (props: BasicComponentProps) => {
    const [searchStr,setSearchStr] = useState<string|undefined>();
    
    return (
        <SearchContext.Provider value={{searchStr, setSearchStr}}>
          <Header></Header>
          {props.children}
          <Footer></Footer>
        </SearchContext.Provider>
    )
}

export default BasicComponent;