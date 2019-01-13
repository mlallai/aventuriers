import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { updateFilters } from '../../actions/filterBySportActions';
import Badge from "components/Badge/Badge.jsx";
import FilterCheckbox from './FilterCheckbox';
import GridItem from "components/Grid/GridItem.jsx";

const availableLevel = [
  'Débutant',
  'Confirmé',
  'Avancé',
  'Expert',
];

class LevelFilter extends Component {

  componentWillMount() {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = (label) => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
  } else {
      this.selectedCheckboxes.add(label);
    }

    this.props.updateFilters(Array.from(this.selectedCheckboxes));
  }

  createCheckbox = (label) => (
<GridItem xs={2}>
    <FilterCheckbox
        classes="filters-available-size text-center"
        label={label}
        handleCheckboxChange={this.toggleCheckbox}
        key={label}
    />
</GridItem>

    // <Checkbox
    //     classes="filters-available-size text-center"
    //     label={label}
    //     handleCheckboxChange={this.toggleCheckbox}
    //     key={label}
    // />

  )

  createCheckboxes = () => (
    availableLevel.map(this.createCheckbox)
  )

  render() {
    return (
      <div className="filters">
        {this.createCheckboxes()}
      </div>
    );
  }
}

LevelFilter.propTypes = {
  updateFilters: PropTypes.func.isRequired,
  filters: PropTypes.array,
}

const mapStateToProps = state => ({
  filters: state.filters.items,
})

export default connect(mapStateToProps, { updateFilters })(LevelFilter);