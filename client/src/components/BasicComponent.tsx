import Header from './Header'
import Footer from './Footer'

type BasicComponentProps = {
    children: React.ReactNode;
}

const BasicComponent = (props: BasicComponentProps) => {
    return (
        <>
          <Header></Header>
          {props.children}
          <Footer></Footer>
        </>
    )
}

export default BasicComponent;