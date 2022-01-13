import React, { useEffect, useState } from "react";
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import { ButtonSecondary } from "../../components/Button";
import cn from "./cn.module.scss";
import styled from 'styled-components/macro';
import Loader from "react-loader-spinner";
import { apiUrls, searchOptions } from "../../config/constants";
import FilmComponent from "./components/FilmComponent";
import PepoleComponent from "./components/PeopleComponent";
import PlanetComponent from "./components/PlanetComponent";
import SpeciesComponent from "./components/SpeciesComponent";
import VehicleComponent from "./components/VehicleComponent";
import StarshipComponent from "./components/StarshipComponent";

// const base_url = "https://swapi.py4e.com/api"//"https://swapi.dev/api";


const SelectWrapper = styled.div<{ width?: number; height?: number; margintop?: number;}>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-right: 10px;  
  // border: 1px solid gray;
  margin-top: ${({margintop}) => (margintop ? margintop + 'px' : '0px')};
  & > * {
    width: ${({width}) => (width ? width + 'px' : '250px')};
    height: ${({height}) => (height ? height + 'px' : '40px')};
    padding-left: 10px;
    @media screen and (max-width: 590px) {
      width: 100% !important;
    }
    @media screen and (max-width: 980px) {
      width: 100% !important;
      margin: 10px !important;
    }
  }
  @media screen and (max-width: 590px) {
    width: 100% !important;
  }  
  @media screen and (max-width: 980px) {
    width: 100% !important;
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
`
const TextAreaWrapper = styled.div<{width?: number; height?: number}>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  border: 1px solid #40444F;
  width: fit-content;
  & > * {
    width: ${({width}) => (width ? width + 'px' : '250px')};
    height: ${({height}) => (height ? height + 'px' : '40px')};
    padding: 10px;    
    font-size: medium;
    resize: none;
    @media screen and (max-width: 590px) {
      width: 100% !important;
    }
    @media screen and (max-width: 980px) {
      width: 100% !important;
    }
  }
  @media screen and (max-width: 590px) {
    width: 100% !important;
  }
  @media screen and (max-width: 980px) {
    width: 100% !important;
    margin-left: 10px !important;
    margin-right: 10px !important;
  }
`
const TableWrapper = styled.div`
  padding: .5rem;
  max-height: 80vh;
  overflow-y: auto;
  width: 100vw;
  table {
    border-spacing: 0;
    border: 1px solid grey;
    width: 100%;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th, td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid grey;
      border-right: 1px solid grey;
      :last-child {
        border-right: 0;
      }
    }    
    @media screen and (max-width: 590px) {
      width: 80% !important;
    }  
    @media screen and (max-width: 980px) {
      width: 80% !important;
    }
  }
`

const HomePage: React.FC<any> = () => {
  const { addToast } = useToasts();
  const [selectProject, setSelectProject] = useState('');
  const [selectLabel, setSelectLabel] = useState('');  
  const [response, setResponse] = useState<any>([]);  
  const [searchTxt, setSearchTxt] = useState('');  
  const [pageLoading, setPageLoading] = useState(false);

  const handleSearchChange = (e: any) => {
    setPageLoading(true);
    setSelectProject(e.target.value);
    const index = e.nativeEvent.target.selectedIndex;
    const label = e.nativeEvent.target[index].text    
    setSelectLabel(label);

    if(index == 0) return;

    axios.get(apiUrls.base_url+`/${label}`).then((res: {data: any}) => { 
      if(res.data) {
        setResponse(res.data.results);
        setPageLoading(false);
      } else {
        addToast('Swapi Error!', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    })  
  }

  const handleSearchTxtChange = (e: any) => {
    setSearchTxt(e.target.value);
  }

  const searchData = () => {
    setPageLoading(true);
    if(searchTxt === undefined || searchTxt === '') return;
    
    axios.get(apiUrls.base_url+`/${searchTxt.trim()}`).then((res: {data: any}) => { 
      console.log("===res::", res.data);
      if(res.data) {
        setResponse(res.data.results);
        setPageLoading(false);
      } else {
        addToast('Swapi Error!', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    })
  }

  return (
    <div className={cn.headerElement}>
      <div className={cn.inlineElement}>
        <SelectWrapper width={300} height={40}>
          <select id="select_p" value={selectProject} onChange={handleSearchChange} >
            {searchOptions?.map((option) => (
              <option value={option.value} key={option.value}>{option.label}</option>
            ))}
          </select>
        </SelectWrapper>
        <SelectWrapper width={250} height={40}>
          <input id="search_str" name="search_str" value={searchTxt} placeholder="Enter a search character" onChange={handleSearchTxtChange} />
        </SelectWrapper>
        <ButtonSecondary
            onClick={() => searchData()}
            padding={'10px 10px'}
            BGColor={'#2a4365'}
            margin={'5px'}
            width={'120px'}
        >
            Search
        </ButtonSecondary>
      </div>
      {pageLoading && 
        <div className={cn.pageLoad}>
          <Loader
            type="Circles"
            color="#00BFFF"
            height={100}
            width={100} />
        </div>
      }
      <div>
        {
          (selectLabel.includes('film') || searchTxt.includes('film')) && <FilmComponent data = {response} />
        }
        {          
          (selectLabel.includes('people') || searchTxt.includes('people')) && <PepoleComponent data = {response} />
        }
        {          
          (selectLabel.includes('planet') || searchTxt.includes('planet')) && <PlanetComponent data = {response} />
        }
        {          
          (selectLabel.includes('specie') || searchTxt.includes('specie')) && <SpeciesComponent data = {response} />
        }
        {          
          (selectLabel.includes('vehicle') || searchTxt.includes('vehicle')) && <VehicleComponent data = {response} />
        }
        {          
          (selectLabel.includes('starship') || searchTxt.includes('starship')) && <StarshipComponent data = {response} />
        }
      </div>
    </div>
  )}

export default HomePage;
