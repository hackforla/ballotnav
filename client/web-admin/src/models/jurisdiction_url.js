import { DataTypes, Deferrable } from './_helpers'

const fields = {
  // id: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   autoIncrement: true,
  //   field: 'id',
  //   primaryKey: true,
  // },
  // wipJurisdictionId: {
  //   type: DataTypes.INTEGER,
  //   field: 'wip_jurisdiction_id',
  //   allowNull: false,
  //   onDelete: 'restrict',
  //   onUpdate: 'cascade',
  //   references: {
  //     model: 'wip_jurisdiction',
  //     key: 'id',
  //     deferrable: Deferrable.INITIALLY_DEFERRED,
  //   },
  //   unique: 'wip_jurisdiction_id-urltype_id',
  // },
  urlTypeId: {
    type: {
      type: 'select',
      options: [
        { value: 1, display: "Check if I'm registered" },
        { value: 2, display: "Online Voter Registration" },
        { value: 3, display: "Find my polling place" },
        { value: 4, display: "View my sample ballot" },
        { value: 5, display: "State Elections Website" },
        { value: 6, display: "List of early voting locations" },
        { value: 7, display: "List of ballot drop-off locations" },
        { value: 8, display: "Track my ballot" },
        { value: 9, display: "Overseas/Military Voting Information" },
        { value: 10, display: "Jurisdiction Elections Website" },
        { value: 11, display: "Ballot drop-off procedures" },
        { value: 12, display: "Apply for an early voting ballot" },
        { value: 13, display: "Voter registration requirements" },
        { value: 14, display: "Early Voting Requirements and Information" },
        { value: 15, display: "Facebook" },
        { value: 16, display: "Twitter" },
        { value: 17, display: "Instagram" },
        { value: 18, display: "Other - Do no publish" },
        { value: 19, display: "Other - Publish" },
        { value: 20, display: "E-Mail Address" },
      ]
    },
    field: 'urltype_id',
    allowNull: false,
    onDelete: 'restrict',
    onUpdate: 'cascade',
    references: {
      model: 'urltype',
      key: 'id',
      deferrable: Deferrable.INITIALLY_DEFERRED,
    },
    unique: 'wip_jurisdiction_id-urltype_id',
  },
  url: {
    type: DataTypes.TEXT,
    field: 'url',
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    field: 'name',
    allowNull: false,
  },
  description: {
    type: 'textarea',
    field: 'description',
    allowNull: true,
  },
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
