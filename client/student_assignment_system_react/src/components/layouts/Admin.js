import React from 'react';


class Admin extends React.Component{
	render(){

		return <div> Hello I am admin </div>;

	}


}

export default Admin;

{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
	<ListItem button key={text}>
	  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
	  <ListItemText primary={text} />
	</ListItem>
  ))}