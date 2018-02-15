// Simple wrapper for FHIR Patient resource
class Patient {
  constructor(resource) {
    this.resource = resource;
  }
  get id() {
    return this.resource.id;
  }
  get name() {
    const first = this.resource.name[0].given.join(' ');
    const last = this.resource.name[0].family;
    return `${first} ${last}`;
  }
  get age() {
    // Calculate either to date of death or to today
    const startDate = this.resource.birthDate;
    const endDate = this.resource.deceasedDateTime || (new Date()).toISOString();
    const ageInSeconds = (Date.parse(endDate) - Date.parse(startDate)) / 1000;
    return `${Math.round(ageInSeconds / (60*60*24*365))} years`;
  }
  get photoSrc() {
    // Build a src string appropriate for putting into an img tag
    if (this.resource.photo && this.resource.photo.length > 0) {
      const contentType = this.resource.photo[0].contentType;
      const base64 = this.resource.photo[0].data;
      return `data:${contentType};base64, ${base64}`;
    } else {
      return false;
    }
  }
}

export default Patient;
