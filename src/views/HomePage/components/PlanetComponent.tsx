import React, { useEffect, useMemo, useState } from "react";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
import { apiUrls, localStorageKeys } from 'config/constants';
import { ButtonSecondary } from "../../../components/Button";

interface PlanetProps {
    name: string;
    climate?: string;
    diameter?: string;
    films?: string[];
    gravity?: string;
    orbital_period?: string;
    population?: string;
    residents?: string[];
    rotation_period?: string;
    surface_water?: string;
    terrain?: string;
    url?: string;
    created?: string;
    edited?: string;
}

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
const PlanetComponent: React.FC<{
    data: PlanetProps[]
}> = ({
    data
}) => {
    const history = useHistory()
    const [mark, setMark] = useState([]);
    const savedData = JSON.parse(window.localStorage.getItem(localStorageKeys.bookmark_planet));

    useEffect(() => {
        const dataLen = data && data.length;
        const temp = [];
        for (let i = 0 ; i < dataLen ; i++ ){
            temp[i] = savedData ? savedData[i] : false;
        }
        setMark(temp);

    }, [data])

    const renderData = useMemo(() => {
        return (
            data &&
            data.map((item, index) => {
                return {
                    ...item,
                    bookmark: savedData && savedData[index],
                }
            })
        )
    }, [data])
    const handleCharacterClick = (link: string) => {
        window.localStorage.setItem(localStorageKeys.film, link)
        history.push('/character-detail');
    }

    const handleBookmark = (e: any, i: number, item: any) => {
        mark[i] = !mark[i]
        const temp = []
        mark.forEach(e => {
            temp.push(e)
        });
        setMark(temp)
        window.localStorage.setItem(localStorageKeys.bookmark_planet, JSON.stringify(mark));
    }

    console.log(data, ":: component")
    return(
        <Container>
            <TableWrapper>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Climate</th>
                        <th>Gravity</th>
                        <th>Population</th>
                        <th>Diameter</th>
                        <th>Terrain</th>
                        <th>Residents</th>
                        <th>Flims</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {data?.map((item, i) => {
                    return (
                        <tr key={item.created}>
                            <td>{item.name}</td>
                            <td>{item.climate}</td>
                            <td>{item.gravity}</td>
                            <td>{item.population}</td>
                            <td>{item.diameter}</td>
                            <td>{item.terrain}</td>
                            <td >
                                {
                                    item.residents?.map((_p) => {
                                        let val = _p.replace(apiUrls.base_url, "");
                                        val = val.substring(1);
                                        return (
                                            <p key={_p}>
                                                <a onClick={() => handleCharacterClick(_p)}>{val}</a>
                                                <br />
                                            </p>
                                        )
                                    })
                                }
                            </td>
                            <td>
                                {
                                    item.films?.map((_p) => {
                                        let val = _p.replace(apiUrls.base_url, "");
                                        val = val.substring(1);
                                        return (
                                            <p key={_p}>
                                                <a onClick={() => handleCharacterClick(_p)}>{val}</a>
                                                <br />
                                            </p>
                                        )
                                    })
                                }
                            </td>
                            <td>
                                <input type="checkbox" name="bookmark" checked={mark[i]} onChange={(event) => handleBookmark(event, i, item)}/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </TableWrapper>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`
export default PlanetComponent;