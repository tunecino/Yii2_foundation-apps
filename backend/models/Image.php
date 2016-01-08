<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * This is the model class for table "image".
 *
 * @property integer $id
 * @property integer $owner_id
 * @property string $name
 * @property string $url
 * @property integer $user_id 
 * @property integer $created_at 
 * @property integer $updated_at
 *
 * @property Owner $owner
 * @property User $user
 * @property ImageHasTag[] $imageHasTags
 * @property Tag[] $tags
 */
class Image extends ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'image';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'url'], 'required'],
            [['name'], 'string', 'max' => 60],
            [['url'], 'string', 'max' => 255],
            [['url'], 'url', 'defaultScheme' => 'http'],
            ['url', 'validateDns'],
        ];
    }

    public function validateDns($attribute, $params)
    {
        $dns = $this->getHost($this->$attribute);
        $owners_list = Owner::find()->select('dns')->asArray()->column();

        if (!in_array($dns, $owners_list)) {
            $this->addError($attribute, 'image owner or provider is not included in our list.');
        }

        if(!is_array(getimagesize($this->$attribute))) {
             $this->addError($attribute, 'url not pointing to an image.');
        }
    }

    private function getHost($url)
    {
        // credits to @stanev01 : http://stackoverflow.com/questions/16027102/get-domain-name-from-full-url#answer-16027164
        $pieces = parse_url($url);
        $domain = isset($pieces['host']) ? $pieces['host'] : '';
        $rx = '/(?P<domain>[a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i';
        if (preg_match($rx, $domain, $regs)) return $regs['domain'];
        return false;
    }

    public function beforeSave($insert)
    {
        if (!array_key_exists('owner_id', $this->getDirtyAttributes())) {
            $dns = $this->getHost($this->url);
            $owner_id = Owner::find()->where(['dns' => $dns])->scalar();
            $this->owner_id = $owner_id;
        }
        if ($insert) $this->user_id = Yii::$app->user->identity->id;
        return parent::beforeSave($insert);
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'owner_id' => 'Owner ID',
            'name' => 'Name',
            'url' => 'Url',
            'user_id' => 'User ID',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    public function behaviors()
    {
        return [
            'timestamp' => [
                'class' => 'yii\behaviors\TimestampBehavior',
                'attributes' => [
                    ActiveRecord::EVENT_BEFORE_INSERT => ['created_at', 'updated_at'],
                    ActiveRecord::EVENT_BEFORE_UPDATE => ['updated_at'],
                ],
            ],
            'linkGroupBehavior' => [
                'class' => \yii2tech\ar\linkmany\LinkManyBehavior::className(),
                'relation' => 'tags', // relation, which will be handled
                'relationReferenceAttribute' => 'tagIds', // virtual attribute, which is used for related records specification
            ],
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getOwner()
    {
        return $this->hasOne(Owner::className(), ['id' => 'owner_id']);
    }

    /** 
    * @return \yii\db\ActiveQuery 
    */ 
    public function getUploader() 
    { 
       return (new \yii\db\Query())
                ->select('username')
                ->from('user')
                ->where([ 'id' => $this->user_id ])
                ->scalar();
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getImageHasTags()
    {
        return $this->hasMany(ImageHasTag::className(), ['image_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getTags()
    {
        return $this->hasMany(Tag::className(), ['id' => 'tag_id'])->viaTable('image_has_tag', ['image_id' => 'id']);
    }

    /**
     * @inheritdoc
     * @return \app\models\queries\ImageQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new \app\models\queries\ImageQuery(get_called_class());
    }

    public function fields()
    {
        $fields = parent::fields();
        unset($fields['owner_id'], $fields['user_id']);
        return $fields;
    }

    public function extraFields()
    {
        return ['owner','tags','uploader'];
    }
}
