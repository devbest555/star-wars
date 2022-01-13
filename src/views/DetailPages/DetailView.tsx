import { localStorageKeys } from 'config/constants';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getFilmDetails } from 'utils/apiHelpers';

const DetailView: React.FC = () => {
    const [detailData, setDetailData] = useState(null);
    
    const link = window.localStorage.getItem(localStorageKeys.film);
    useEffect(() => {
        const fetch = async () => {
            const detailRes = await getFilmDetails(link)
            console.log("detailRes ::", detailRes)
            if (detailRes) {
                setDetailData(detailRes);
            }
        }
        if (link) {
            fetch()
        }
    }, [])
    
    return (
        <Container>
            {
                link.includes('film') && <Card>
                    <h2 style={{textDecoration: 'underline'}}>film Data</h2>
                    <StyledText><strong>Title :</strong> {detailData?.title}</StyledText>
                    <StyledText><strong>Episode_id :</strong> {detailData?.episode_id}</StyledText>
                    <StyledText><strong>opening_crawl :</strong> {detailData?.opening_crawl}</StyledText>
                    <StyledText><strong>characters :</strong> {detailData?.characters}</StyledText>
                    <StyledText><strong>planets :</strong> {detailData?.planets}</StyledText>
                    <StyledText><strong>producer :</strong> {detailData?.producer}</StyledText>
                    <StyledText><strong>species :</strong> {detailData?.species}</StyledText>
                    <StyledText><strong>starships :</strong> {detailData?.starships}</StyledText>
                    <StyledText><strong>vehicles :</strong> {detailData?.vehicles}</StyledText>
                    <StyledText><strong>Created :</strong> {detailData?.created}</StyledText>
                    <StyledText><strong>Edited :</strong> {detailData?.edited}</StyledText>
                    <StyledText><strong>Url :</strong> {detailData?.url}</StyledText>
                </Card>            
            }
            {
                link.includes('people') && <Card>
                <h2 style={{textDecoration: 'underline'}}>People Data</h2>
                    <StyledText><strong>Name :</strong> {detailData?.name}</StyledText>
                    <StyledText><strong>Gender :</strong> {detailData?.gender}</StyledText>
                    <StyledText><strong>Birth Year :</strong> {detailData?.birth_year}</StyledText>
                    <StyledText><strong>Height :</strong> {detailData?.height}</StyledText>
                    <StyledText><strong>Hair Color :</strong> {detailData?.hair_color}</StyledText>
                    <StyledText><strong>Skin Color :</strong> {detailData?.skin_color}</StyledText>
                    <StyledText><strong>Films :</strong> {detailData?.films}</StyledText>
                    <StyledText><strong>Created :</strong> {detailData?.created}</StyledText>
                    <StyledText><strong>Edited :</strong> {detailData?.edited}</StyledText>
                    <StyledText><strong>Url :</strong> {detailData?.url}</StyledText>
                </Card>            
            }
            {
                link.includes('planet') && <Card>
                    <h2 style={{textDecoration: 'underline'}}>Planet Data</h2>
                    <StyledText><strong>Name :</strong> {detailData?.name}</StyledText>
                    <StyledText><strong>Climate :</strong> {detailData?.climate}</StyledText>
                    <StyledText><strong>Diameter :</strong> {detailData?.diameter}</StyledText>
                    <StyledText><strong>Gravity :</strong> {detailData?.gravity}</StyledText>
                    <StyledText><strong>Population :</strong> {detailData?.population}</StyledText>
                    <StyledText><strong>Surface Water :</strong> {detailData?.surface_water}</StyledText>
                    <StyledText><strong>Terrain :</strong> {detailData?.terrain}</StyledText>
                    <StyledText><strong>Residents :</strong> {detailData?.residents}</StyledText>
                    <StyledText><strong>Films :</strong> {detailData?.films}</StyledText>
                    <StyledText><strong>Created :</strong> {detailData?.created}</StyledText>
                    <StyledText><strong>Edited :</strong> {detailData?.edited}</StyledText>
                    <StyledText><strong>Url :</strong> {detailData?.url}</StyledText>
                </Card>            
            }
            {
                link.includes('specie') && <Card>
                    <h2 style={{textDecoration: 'underline'}}>Specie Data</h2>
                    <StyledText><strong>Name :</strong> {detailData?.name}</StyledText>
                    <StyledText><strong>classification :</strong> {detailData?.classification}</StyledText>
                    <StyledText><strong>designation :</strong> {detailData?.designation}</StyledText>
                    <StyledText><strong>average_height :</strong> {detailData?.average_height}</StyledText>
                    <StyledText><strong>Hair Color :</strong> {detailData?.hair_color}</StyledText>
                    <StyledText><strong>Skin Color :</strong> {detailData?.skin_color}</StyledText>
                    <StyledText><strong>Films :</strong> {detailData?.films}</StyledText>
                    <StyledText><strong>Created :</strong> {detailData?.created}</StyledText>
                    <StyledText><strong>Edited :</strong> {detailData?.edited}</StyledText>
                    <StyledText><strong>Url :</strong> {detailData?.url}</StyledText>
                </Card>            
            }
            {
                link.includes('starship') && <Card>
                    <h2 style={{textDecoration: 'underline'}}>Starship Data</h2>
                    <StyledText><strong>Name :</strong> {detailData?.name}</StyledText>
                    <StyledText><strong>Model :</strong> {detailData?.model}</StyledText>
                    <StyledText><strong>Consumables :</strong> {detailData?.consumables}</StyledText>
                    <StyledText><strong>Crew :</strong> {detailData?.crew}</StyledText>
                    <StyledText><strong>Manufacturer :</strong> {detailData?.manufacturer}</StyledText>
                    <StyledText><strong>Passengers :</strong> {detailData?.passengers}</StyledText>
                    <StyledText><strong>Pilots :</strong> {detailData?.pilots}</StyledText>
                    <StyledText><strong>Max Atmosphering Speed :</strong> {detailData?.max_atmosphering_speed}</StyledText>
                    <StyledText><strong>Films :</strong> {detailData?.films}</StyledText>
                    <StyledText><strong>Created :</strong> {detailData?.created}</StyledText>
                    <StyledText><strong>Edited :</strong> {detailData?.edited}</StyledText>
                    <StyledText><strong>Url :</strong> {detailData?.url}</StyledText>
                </Card>            
            }
            {
                link.includes('vehicle') && <Card>
                    <h2 style={{textDecoration: 'underline'}}>Vihicle Data</h2>
                    <StyledText><strong>Name :</strong> {detailData?.name}</StyledText>
                    <StyledText><strong>Model :</strong> {detailData?.model}</StyledText>
                    <StyledText><strong>Cargo Capacity :</strong> {detailData?.cargo_capacity}</StyledText>
                    <StyledText><strong>Consumables :</strong> {detailData?.consumables}</StyledText>
                    <StyledText><strong>Crew :</strong> {detailData?.crew}</StyledText>
                    <StyledText><strong>Manufacturer :</strong> {detailData?.manufacturer}</StyledText>
                    <StyledText><strong>Passengers :</strong> {detailData?.passengers}</StyledText>
                    <StyledText><strong>vehicle Class :</strong> {detailData?.vehicle_class}</StyledText>
                    <StyledText><strong>Pilots :</strong> {detailData?.pilots}</StyledText>
                    <StyledText><strong>Max Atmosphering Speed :</strong> {detailData?.max_atmosphering_speed}</StyledText>
                    <StyledText><strong>Films :</strong> {detailData?.films}</StyledText>
                    <StyledText><strong>Created :</strong> {detailData?.created}</StyledText>
                    <StyledText><strong>Edited :</strong> {detailData?.edited}</StyledText>
                    <StyledText><strong>Url :</strong> {detailData?.url}</StyledText>
                </Card>            
            }
            
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
const Card = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    margin-left: 15%;
    margin-right: 15%;
    border: 1px solid white;
    border-radius: 20px;
    padding: 10px;
`
const StyledText = styled.p`
    color: white;
    word-break: break-all;
`
export default DetailView;
