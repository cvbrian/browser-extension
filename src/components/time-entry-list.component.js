import * as React from 'react';
import TimeEntry from './time-entry.component';

class TimeEntryList extends React.Component {

    constructor(props) {
        super(props);
    }

    playTimeEntry(timeEntry) {
        this.props.selectTimeEntry(timeEntry);
    }

    handleRefresh() {
        this.props.handleRefresh();
    }

    changeMode(mode) {
        this.props.changeMode(mode);
    }

    render() {
        if(this.props.timeEntries.length === 0 && !JSON.parse(localStorage.getItem('offline'))) {
            return (
                <div className="no-entries">
                    <div className="no-entries-img"></div>
                    <span>No recent entries to show</span>
                    <label>It looks like you haven't tracked any time lately.</label>
                </div>
            )
        } else if(this.props.timeEntries.length === 0 && JSON.parse(localStorage.getItem('offline'))) {
            return(
                    <div className="no-entries">
                        <div className="no-entries-img"></div>
                        <span>Get online to see your entries.</span>
                        <label>In the meantime, you can still track time, even if you're offline.</label>
                    </div>
            )
        } else {
            return(
                <div>
                    {
                        this.props.dates.map((day) => {
                            return (
                                <div className="time-entries-list" key={day}>
                                    <div className="time-entries-list-time">
                                        <span className="time-entries-list-day">{day.split("-")[0]}</span>
                                        <div className="time-entries-total-and-time">
                                            <span className="time-entries-list-total">Total:</span>
                                            <span className="time-entries-list-total-time">{day.split("-")[1]}</span>
                                        </div>
                                    </div>
                                    {this.props.timeEntries.filter(timeEntry => timeEntry.start === day.split("-")[0]).map(timeEntry => {
                                        return (
                                            <TimeEntry
                                                key={timeEntry.id}
                                                timeEntry={timeEntry}
                                                project={timeEntry.project ? timeEntry.project : null}
                                                task={timeEntry.task ? timeEntry.task : null}
                                                playTimeEntry={this.playTimeEntry.bind(this)}
                                                changeMode={this.changeMode.bind(this)}
                                                timeFormat={this.props.timeFormat}
                                                workspaceSettings={this.props.workspaceSettings}
                                                isUserOwnerOrAdmin={this.props.isUserOwnerOrAdmin}
                                                userSettings={this.props.userSettings}
                                            />
                                        )
                                    })}
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }
}

export default TimeEntryList;