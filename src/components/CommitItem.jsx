import { Button, Timeline } from 'flowbite-react';
import { HiArrowNarrowRight } from 'react-icons/hi';

export default function CommitItem(props){
    return (
        <Timeline.Item className='mb-4'>
            <Timeline.Point />
            <Timeline.Content>
            <Timeline.Time>
                {new Date(props.commit.commit.author.date).toDateString()}
            </Timeline.Time>
            <Timeline.Title>
                {props.commit.commit.message}
            </Timeline.Title>
            </Timeline.Content>
        </Timeline.Item>
    );
}