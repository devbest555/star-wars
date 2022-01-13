import React, { useEffect, useMemo, useState } from "react";
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
import { apiUrls, localStorageKeys } from 'config/constants';

interface VehicleProps {
    name?: string;
    model?: string;
    cargo_capacity?: string;
    consumables?: string;
    cost_in_credits?: string;
    crew?: string;
    manufacturer?: string;
    length?: string;
    max_atmosphering_speed?: string;
    passengers?: string;
    vehicle_class?: string;
    films?: string[];
    pilots?: string[];
    created?: string;
    edited?: string;
    url?: string;
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
const VehicleComponent: React.FC<{
    data: VehicleProps[]
}> = ({
    data
}) => {
    const history = useHistory();
    const [mark, setMark] = useState([]);
    const savedData = JSON.parse(window.localStorage.getItem(localStorageKeys.bookmark_vehicle));

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

    // console.log("renderData ::", renderData, mark)

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
        window.localStorage.setItem(localStorageKeys.bookmark_vehicle, JSON.stringify(mark));
    }
    return(
        <Container>
            <TableWrapper>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Crew</th>
                        <th>Passengers</th>
                        <th>Length</th>
                        <th>Films</th>
                        <th>Pilots</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item, i) => {
                    return (
                        <tr key={item.created}>
                            <td>{item.name}</td>
                            <td>{item.model}</td>
                            <td>{item.manufacturer}</td>
                            <td>{item.crew}</td>
                            <td>{item.passengers}</td>
                            <td>{item.length}</td>
                            <td >
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
                                {
                                    item.pilots?.map((_p) => {
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
export default VehicleComponent;