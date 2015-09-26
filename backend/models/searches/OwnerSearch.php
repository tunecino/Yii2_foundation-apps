<?php

namespace app\models\searches;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Owner;

/**
 * OwnerSearch represents the model behind the search form about `app\models\Owner`.
 */
class OwnerSearch extends Owner
{
    public $image_id;
    public $tag_id;

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id', 'image_id', 'tag_id'], 'integer'],
            [['dns'], 'safe'],
        ];
    }

    /**
     * @inheritdoc
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Owner::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        $query->joinWith(['images','images.tags']);
        $query->groupBy(['owner.id']);

        $query->andFilterWhere([
            'owner.id' => $this->id,
            'image.id' => $this->image_id,
            'tag.id' => $this->tag_id,
        ]);

        $query->andFilterWhere(['like', 'dns', $this->dns]);

        return $dataProvider;
    }
}
