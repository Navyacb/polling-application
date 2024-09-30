import { Accordion, Button, CheckIcon, Container, Group, Radio, Select, Stack, Text } from '@mantine/core';
import { CategoryContextData, ICategory } from '../../state-management/CategoryContextData';
import { IPollData } from '../../state-management/UserPollsContextData';
import { useContext, useEffect, useState } from 'react';
import { UserAccountContextData } from '../../state-management/UserAccountContextData';
import { Link } from 'react-router-dom';


const PollList : React.FC<IPollData> = ({polls})=>{
    const {category} = useContext(CategoryContextData)
    const [sort,setSort] = useState(false)
    const {userAccount} = useContext(UserAccountContextData)

    const categoryList = category.map((ele: ICategory) => ({ value: ele.categoryName, label: ele.categoryName }))

    const [selectedCat,setSelectedCat] = useState<string | null>(null)

    const pollList = polls.map(poll=>{
        const timeDiffInMilliseconds = poll.endDate?new Date(poll.endDate).getTime() - new Date().getTime() : null;
                    const daysLeft = timeDiffInMilliseconds ? Math.ceil(timeDiffInMilliseconds / (1000 * 60 * 60 * 24)) : 0
        return {...poll,
             category : category.find(cat=>cat._id === poll.category),
             //created : userAccount.find(user=>user._id ==== poll.created),
             expires : daysLeft,
             isVote : false
            }
    })

    const [pollListData,setPollListData] = useState(pollList)

    useEffect(() => {
        let filteredPolls = pollList;
        if (selectedCat) {
          filteredPolls = pollList.filter(poll => {
            const pollCategory = category.find(cat => cat.categoryName === poll.category?.categoryName)
            return pollCategory?.categoryName === selectedCat
          })
        }
    
        if (sort) {
          filteredPolls.sort((a, b) => a.expires - b.expires)
        } else {
          filteredPolls.sort((a, b) => b.expires - a.expires)
        }
    
        setPollListData(filteredPolls);
    }, [category, pollList, selectedCat, sort]);

    const handleSelectedCat = (value: string | null)=>{
        setSelectedCat(value)
    }

    const handleSort = ()=>{
        setSort(!sort)
    }

    return (
        <Container p={20}>
            <Group>
                <Select
                    placeholder="Filter by Category"
                    data={categoryList}
                    value={selectedCat}
                    onChange={handleSelectedCat}
                    clearable
                />
                <Button variant="default" onClick={handleSort}>{ !sort ? 'Sort by Sooner to expire' : 'Sort by least to expire'} </Button>
            </Group> 

            <Accordion p={20}>
            {
                pollListData.map((poll,i)=>{
                    return (
                    <Accordion.Item key={i} value={poll.question}>
                        <Accordion.Control>
                            <Group justify='space-between'>
                                <Text>{poll.question}</Text>
                                <Text>{poll.category?.categoryName}</Text>
                                <Text>Expires in {poll.expires} days</Text>
                            </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Radio.Group
                                name="chooseOption">
                                    <Stack>
                                        {
                                        poll.options.map((option,i)=>{
                                            return <Radio icon={CheckIcon} disabled={poll.isVote || !userAccount._id} key={i} label={option.optionText} value={option.optionText}/>
                                        })
                                        }
                                    </Stack>
                            </Radio.Group>
                            <Group mt={20}>
                                <Button disabled={poll.isVote || !userAccount._id}>{poll.isVote? 'Voted' : 'Vote'}</Button>
                                {!userAccount._id && <Link to="/authenticate"><Button>Login to Vote</Button></Link>}
                            </Group>
                        </Accordion.Panel>
                    </Accordion.Item>)
                })
            }
            </Accordion>
        </Container>
    )
}

export default PollList