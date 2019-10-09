import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'lu-formly',
	templateUrl: './formly.component.html'
})
export class FormlyComponent {
	form: FormGroup = new FormGroup({});
	userFields = [
		{
			key: 'name',
			type: 'input',
			templateOptions: {
				type: 'text',
				label: 'name - text',
			},
		},
		{
			key: 'email',
			type: 'input',
			templateOptions: {
				type: 'email',
				label: 'email - email',
			},
		},
		{
			key: 'password',
			type: 'input',
			templateOptions: {
				type: 'password',
				label: 'password - password',
			},
		},
		{
			key: 'age',
			type: 'input',
			templateOptions: {
				type: 'number',
				label: 'age - number',
			},
		},
		{
			key: 'birthDate',
			type: 'date',
			templateOptions: {
				label: 'birthDate - date',
			},
		},
		{
			key: 'description',
			type: 'textarea',
			templateOptions: {
				label: 'description - textarea',
				placeholder: 'enter your life journey',
			},
		},
		{
			key: 'orientation',
			type: 'select',
			templateOptions: {
				label: 'sexual orientation - select',
				placeholder: 'choose well',
				options: [
					{ id: 0, name: 'female' },
					{ id: 1, name: 'male' },
					{ id: 2, name: 'other' },
				],
			},
			focus: true,
		},
		{
			key: 'manager',
			type: 'user',
			templateOptions: {
				label: 'manager - user',
				placeholder: 'pings /api/v3/users/search',
			},
		},
		{
			key: 'department',
			type: 'api',
			templateOptions: {
				label: 'department - api',
				placeholder: 'pings /api/v3/departments',
				api: '/api/v3/departments',
				filters: ['isActive=true'],
			},
		},
		{
			key: 'Radio',
			type: 'radio',
			templateOptions: {
				label: 'Radio input',
				options: [
					{ value: 1, label: 'Option 1'},
					{ value: 2, label: 'Option 2'},
					{ value: 3, label: 'Option 3'},
					{ value: 4, label: 'Option 4'},
				]
			}
		},
		{
			key: 'checkbox',
			type: 'checkbox',
			templateOptions: {
				label: 'Checkboxes',
			}
		},
	];

	user = {
		orientation: { id: 0, name: 'female' },
		manager: { id: 421, firstName: 'Lulu', lastName: 'B.' },
	};

	submit(user) {
		console.log(user);
	}
}