import { DataTypes } from './_helpers'

const fields = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    field: 'id',
    primaryKey: true,
  },
  // jurisdictionId: {
  //   type: DataTypes.INTEGER,
  //   field: 'jurisdiction_id',
  //   allownull: false,
  //   onDelete: 'restrict',
  //   onUpdate: 'cascade',
  //   references: {
  //     model: 'jurisdiction',
  //     key: 'id',
  //     deferrable: Deferrable.INITIALLY_DEFERRED,
  //   },
  // },
  facilityTypeId: {
    type: {
      type: 'select',
      options: [
        { value: 1, display: 'Business' },
        { value: 2, display: 'Government' },
        { value: 3, display: 'Library' },
        { value: 4, display: 'Metro Station' },
        { value: 5, display: 'Police Station' },
        { value: 6, display: 'Recreation Center' },
        { value: 7, display: 'School' },
        { value: 8, display: 'Unknown' },
      ]
    },
    field: 'facilitytype_id',
    allownull: false,
    // onDelete: 'restrict',
    // onUpdate: 'cascade',
    // references: {
    //   model: 'facilitytype',
    //   key: 'id',
    //   deferrable: Deferrable.INITIALLY_DEFERRED,
    // },
  },
  name: {
    type: DataTypes.TEXT,
    field: 'name',
    allowNull: true,
  },
  infoPublic: {
    type: 'textarea',
    field: 'info_public',
    allowNull: true,
  },
  timezone: {
    type: DataTypes.TEXT,
    field: 'timezone',
    allowNull: true,
  },
  address1: {
    type: DataTypes.TEXT,
    field: 'address1',
    allowNull: true,
  },
  address2: {
    type: DataTypes.TEXT,
    field: 'address2',
    allowNull: true,
  },
  address3: {
    type: DataTypes.TEXT,
    field: 'address3',
    allowNull: true,
  },
  city: {
    type: DataTypes.TEXT,
    field: 'city',
    allowNull: true,
  },
  state: {
    type: DataTypes.TEXT,
    field: 'state',
    allowNull: true,
  },
  zip: {
    type: DataTypes.TEXT,
    field: 'zip',
    allowNull: true,
  },
  contactName: {
    type: DataTypes.TEXT,
    field: 'contact_name',
    allowNull: true,
  },
  contactEmail: {
    type: DataTypes.TEXT,
    field: 'contact_email',
    allowNull: true,
  },
  contactFax: {
    type: DataTypes.TEXT,
    field: 'contact_fax',
    allowNull: true,
  },
  contactPhone: {
    type: DataTypes.TEXT,
    field: 'contact_phone',
    allowNull: true,
  },
  internalNote: {
    type: 'textarea',
    field: 'internal_note',
    allowNull: true,
  },
  displayNote: {
    type: 'textarea',
    field: 'display_note',
    allowNull: true,
  },
  // geomLatitude: {
  //   type: DataTypes.DECIMAL,
  //   field: 'geom_latitude',
  //   allowNull: true,
  // },
  // geomLongitude: {
  //   type: DataTypes.DECIMAL,
  //   field: 'geom_longitude',
  //   allowNull: true,
  // },
  // geomDataSource: {
  //   type: DataTypes.TEXT,
  //   field: 'geom_data_source',
  //   allowNull: true,
  // },
  // geomDataNote: {
  //   type: DataTypes.TEXT,
  //   field: 'geom_data_note',
  //   allowNull: true,
  // },
  // geomPoint: {
  //   type: DataTypes.GEOMETRY('POINT', 4326),
  //   field: 'geom_point',
  //   allowNull: true,
  // },
  isEarlyDropoffLocation: {
    type: 'YNU',
    field: 'is_early_dropoff_location',
    allowNull: false,
    defaultValue: 'U',
  },
  isEarlyVotingLocation: {
    type: 'YNU',
    field: 'is_early_voting_location',
    allowNull: false,
    defaultValue: 'U',
  },
  isElectionsOffice: {
    type: 'YNU',
    field: 'is_elections_office',
    allowNull: false,
    defaultValue: 'U',
  },
  isPollingLocation: {
    type: 'YNU',
    field: 'is_polling_location',
    allowNull: false,
    defaultValue: 'U',
  },
  isDropBox: {
    type: 'YNU',
    field: 'is_drop_box',
    allowNull: false,
    defaultValue: 'U',
  },
  isHandicapAccessible: {
    type: 'YNU',
    field: 'is_handicap_accessible',
    allowNull: false,
    defaultValue: 'U',
  },
  isStaffedLocation: {
    type: 'YNU',
    field: 'is_staffed_location',
    allowNull: false,
    defaultValue: 'U',
  },
  isOutdoors: {
    type: 'YNU',
    field: 'is_outdoors',
    allowNull: false,
    defaultValue: 'U',
  },
  isDriveup: {
    type: 'YNU',
    field: 'is_driveup',
    allowNull: false,
    defaultValue: 'U',
  },
  rules: {
    type: 'textarea',
    field: 'rules',
    allowNull: true,
  },
  scheduleType: {
    type: DataTypes.ENUM('description', 'hours', 'continuous'),
    field: 'schedule_type',
    allowNull: false,
    defaultValue: 'description',
  },
  scheduleDescription: {
    type: 'textarea',
    field: 'schedule_description',
    allowNull: true,
  },
  continuousOpenDate: {
    type: 'date',
    field: 'continuous_open_date',
    allowNull: true,
  },
  continuousOpenTime: {
    type: 'time',
    field: 'continuous_open_time',
    allowNull: true,
  },
  continuousCloseDate: {
    type: 'date',
    field: 'continuous_close_date',
    allowNull: true,
  },
  continuousCloseTime: {
    type: 'time',
    field: 'continuous_close_time',
    allowNull: true,
  },
  // isValidatedName: {
  //   type: DataTypes.BOOLEAN,
  //   field: 'is_validated_name',
  //   allowNull: false,
  //   defaultValue: false,
  // },
  // isValidatedWayfinding: {
  //   type: DataTypes.BOOLEAN,
  //   field: 'is_validated_wayfinding',
  //   allowNull: false,
  //   defaultValue: false,
  // },
  // isValidatedTimezone: {
  //   type: DataTypes.BOOLEAN,
  //   field: 'is_validated_timezone',
  //   allowNull: false,
  //   defaultValue: false,
  // },
  // isValidatedPhones: {
  //   type: DataTypes.BOOLEAN,
  //   field: 'is_validated_phones',
  //   allowNull: false,
  //   defaultValue: false,
  // },
  // isValidatedEmail: {
  //   type: DataTypes.BOOLEAN,
  //   field: 'is_validated_email',
  //   allowNull: false,
  //   defaultValue: false,
  // },
  // isValidatedHours: {
  //   type: DataTypes.BOOLEAN,
  //   field: 'is_validated_hours',
  //   allowNull: false,
  //   defaultValue: false,
  // },
  // isValidatedRules: {
  //   type: DataTypes.BOOLEAN,
  //   field: 'is_validated_rules',
  //   allowNull: false,
  //   defaultValue: false,
  // },
  // isValidatedUseflags: {
  //   type: DataTypes.BOOLEAN,
  //   field: 'is_validated_useflags',
  //   allowNull: false,
  //   defaultValue: false,
  // },
  // isValidatedDisplayNotes: {
  //   type: DataTypes.BOOLEAN,
  //   field: 'is_validated_displaynotes',
  //   allowNull: false,
  //   defaultValue: false,
  // },
  // createdAt: {
  //   type: DataTypes.DATE,
  //   field: 'created_at',
  //   allowNull: true,
  // },
  // updatedAt: {
  //   type: DataTypes.DATE,
  //   field: 'updated_at',
  //   allowNull: true,
  // },
  // deletedAt: {
  //   type: DataTypes.DATE,
  //   field: 'deleted_at',
  //   allowNull: true,
  // },
}

export default fields
