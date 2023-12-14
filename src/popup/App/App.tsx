import './App.css'
import SqlTemplate from '../SqlTemplate/SqlTemplate'
import HeaderLayout from '../Header/Header'

function App() {
  window.onscroll = function() {
    const header = document.querySelector('header');
    const sticky = header!.offsetTop;

    if (window.pageYOffset > sticky) {
        header!.classList.add('shadow');
    } else {
        header!.classList.remove('shadow');
    }
};
  return (
    <div className="container mx-auto w-[1440px] mt-[50px]">
      <HeaderLayout />
      <main className='mt-[3rem]'>
        <SqlTemplate />
      </main>
    </div>
  )
}

export default App
